import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { hash } from 'bcryptjs';

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;
      
      const exists = await ctx.prisma.user.findUnique({
        where: { email },
      });
      
      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }
      
      const hashedPassword = await hash(password, 12);
      
      const user = await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          aiSettings: {
            create: {
              autoApprovalThreshold: 80,
              responseSpeed: 70,
              toneFormal: 60,
              toneCreative: 40,
            },
          },
        },
      });
      
      return { user };
    }),

  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'You are logged in!';
  }),
}); 