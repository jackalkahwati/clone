import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { DeepSeekAI } from '@/lib/ai/deepseek';
import { ChatService } from '@/lib/chat/chat-service';

export const messageRouter = router({
  getMessages: protectedProcedure
    .input(
      z.object({
        platform: z.enum(['slack', 'teams']).optional(),
        channel: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { platform, channel, limit, cursor } = input;
      const userId = ctx.session.user.id;

      const messages = await ctx.prisma.message.findMany({
        where: {
          userId,
          ...(platform && { platform }),
          ...(channel && { channel }),
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem!.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),

  generateResponse: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { messageId } = input;
      const userId = ctx.session.user.id;

      const message = await ctx.prisma.message.findUnique({
        where: {
          id: messageId,
          userId,
        },
        include: {
          user: {
            include: {
              aiSettings: true,
            },
          },
        },
      });

      if (!message) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Message not found',
        });
      }

      const ai = new DeepSeekAI();
      const response = await ai.generateChatResponse(message, message.user.aiSettings);

      await ctx.prisma.message.update({
        where: { id: messageId },
        data: { aiResponse: response },
      });

      return { response };
    }),

  sendResponse: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
        response: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { messageId, response } = input;
      const userId = ctx.session.user.id;

      const message = await ctx.prisma.message.findUnique({
        where: {
          id: messageId,
          userId,
        },
      });

      if (!message) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Message not found',
        });
      }

      const chatService = new ChatService();
      await chatService.sendMessage({
        platform: message.platform,
        channel: message.channel,
        content: response,
      });

      return { success: true };
    }),
}); 