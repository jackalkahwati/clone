import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { DeepSeekAI } from '@/lib/ai/deepseek';
import { DocumentService } from '@/lib/document/document-service';

export const documentRouter = router({
  getDocuments: protectedProcedure
    .input(
      z.object({
        type: z.enum(['prd', 'report', 'summary']).optional(),
        status: z.enum(['draft', 'review', 'final']).optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { type, status, limit, cursor } = input;
      const userId = ctx.session.user.id;

      const documents = await ctx.prisma.document.findMany({
        where: {
          userId,
          ...(type && { type }),
          ...(status && { status }),
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          updatedAt: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (documents.length > limit) {
        const nextItem = documents.pop();
        nextCursor = nextItem!.id;
      }

      return {
        documents,
        nextCursor,
      };
    }),

  generateDocument: protectedProcedure
    .input(
      z.object({
        type: z.enum(['prd', 'report', 'summary']),
        title: z.string(),
        context: z.object({
          emails: z.array(z.string()).optional(),
          messages: z.array(z.string()).optional(),
          events: z.array(z.string()).optional(),
          tasks: z.array(z.string()).optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { type, title, context } = input;
      const userId = ctx.session.user.id;

      // Fetch related data based on context
      const contextData = await DocumentService.gatherContextData(ctx.prisma, userId, context);

      // Generate document content using AI
      const ai = new DeepSeekAI();
      const content = await ai.generateDocument({
        type,
        title,
        contextData,
      });

      // Create document in database
      const document = await ctx.prisma.document.create({
        data: {
          userId,
          title,
          content,
          type,
          status: 'draft',
          aiGenerated: true,
        },
      });

      return { document };
    }),

  updateDocument: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        status: z.enum(['draft', 'review', 'final']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentId, ...updateData } = input;
      const userId = ctx.session.user.id;

      const document = await ctx.prisma.document.findUnique({
        where: {
          id: documentId,
          userId,
        },
      });

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Document not found',
        });
      }

      const updatedDocument = await ctx.prisma.document.update({
        where: { id: documentId },
        data: updateData,
      });

      // Store document version in S3
      if (updateData.content) {
        await DocumentService.storeVersion(documentId, updateData.content);
      }

      return { document: updatedDocument };
    }),

  deleteDocument: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentId } = input;
      const userId = ctx.session.user.id;

      const document = await ctx.prisma.document.findUnique({
        where: {
          id: documentId,
          userId,
        },
      });

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Document not found',
        });
      }

      // Delete document and its versions from S3
      await DocumentService.deleteVersions(documentId);

      await ctx.prisma.document.delete({
        where: { id: documentId },
      });

      return { success: true };
    }),

  shareDocument: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
        emails: z.array(z.string().email()),
        permission: z.enum(['view', 'edit']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { documentId, emails, permission } = input;
      const userId = ctx.session.user.id;

      const document = await ctx.prisma.document.findUnique({
        where: {
          id: documentId,
          userId,
        },
      });

      if (!document) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Document not found',
        });
      }

      // Generate sharing links and send invitations
      const sharingLinks = await DocumentService.shareDocument(documentId, emails, permission);

      return { sharingLinks };
    }),
}); 