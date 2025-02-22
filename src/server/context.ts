import { inferAsyncReturnType } from '@trpc/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface CreateContextOptions {
  req: Request;
}

export async function createContext({ req }: CreateContextOptions) {
  const session = await getServerSession(authOptions);

  return {
    req,
    session,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 