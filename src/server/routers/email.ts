import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { DeepSeekAI } from '@/lib/ai/deepseek';
import { EmailService } from '@/lib/email/email-service';

export const emailRouter = router({
  getEmails: protectedProcedure
    .input(
      z.object({
        status: z.enum(['read', 'unread', 'archived']).optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { status, limit, cursor } = input;
      const userId = ctx.session.user.id;

      const emails = await ctx.prisma.email.findMany({
        where: {
          userId,
          ...(status && { status }),
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (emails.length > limit) {
        const nextItem = emails.pop();
        nextCursor = nextItem!.id;
      }

      return {
        emails,
        nextCursor,
      };
    }),

  generateResponse: protectedProcedure
    .input(
      z.object({
        emailId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { emailId } = input;
      const userId = ctx.session.user.id;

      const email = await ctx.prisma.email.findUnique({
        where: {
          id: emailId,
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

      if (!email) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Email not found',
        });
      }

      const ai = new DeepSeekAI();
      const response = await ai.generateEmailResponse(email, email.user.aiSettings);

      await ctx.prisma.email.update({
        where: { id: emailId },
        data: { aiResponse: response },
      });

      return { response };
    }),

  sendResponse: protectedProcedure
    .input(
      z.object({
        emailId: z.string(),
        response: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { emailId, response } = input;
      const userId = ctx.session.user.id;

      const email = await ctx.prisma.email.findUnique({
        where: {
          id: emailId,
          userId,
        },
      });

      if (!email) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Email not found',
        });
      }

      const emailService = new EmailService();
      await emailService.sendEmail({
        to: email.sender,
        subject: `Re: ${email.subject}`,
        body: response,
      });

      await ctx.prisma.email.update({
        where: { id: emailId },
        data: { status: 'archived' },
      });

      return { success: true };
    }),
}); 