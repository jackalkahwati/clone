import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TaskService } from '../../lib/task/task-service';
import type { ExternalTask } from '../../lib/task/task-service';

export const taskRouter = router({
  getTasks: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string().optional(),
        status: z.enum(['todo', 'in_progress', 'done']).optional(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { workspaceId, status, priority, limit, cursor } = input;
      const userId = ctx.session.user.id;

      const tasks = await ctx.prisma.task.findMany({
        where: {
          userId,
          ...(workspaceId && { workspaceId }),
          ...(status && { status }),
          ...(priority && { priority }),
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [
          { priority: 'desc' },
          { dueDate: 'asc' },
        ],
        include: {
          workspace: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (tasks.length > limit) {
        const nextItem = tasks.pop();
        nextCursor = nextItem!.id;
      }

      return {
        tasks,
        nextCursor,
      };
    }),

  createTask: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        title: z.string(),
        description: z.string().optional(),
        priority: z.enum(['low', 'medium', 'high']).default('medium'),
        dueDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workspaceId, ...taskData } = input;
      const userId = ctx.session.user.id;

      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          id: workspaceId,
          userId,
        },
      });

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
        });
      }

      // Create task in external service
      const taskService = new TaskService(workspace.platform);
      const externalTaskId = await taskService.createTask({
        ...taskData,
        workspace,
      });

      // Create task in local database
      const task = await ctx.prisma.task.create({
        data: {
          ...taskData,
          userId,
          workspaceId,
          status: 'todo',
        },
        include: {
          workspace: true,
        },
      });

      return { task };
    }),

  updateTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(['todo', 'in_progress', 'done']).optional(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { taskId, ...updateData } = input;
      const userId = ctx.session.user.id;

      const task = await ctx.prisma.task.findUnique({
        where: {
          id: taskId,
          userId,
        },
        include: {
          workspace: true,
        },
      });

      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Task not found',
        });
      }

      // Update task in external service
      const taskService = new TaskService(task.workspace.platform);
      await taskService.updateTask({
        taskId,
        ...updateData,
        workspace: task.workspace,
      });

      // Update task in local database
      const updatedTask = await ctx.prisma.task.update({
        where: { id: taskId },
        data: updateData,
        include: {
          workspace: true,
        },
      });

      return { task: updatedTask };
    }),

  deleteTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { taskId } = input;
      const userId = ctx.session.user.id;

      const task = await ctx.prisma.task.findUnique({
        where: {
          id: taskId,
          userId,
        },
        include: {
          workspace: true,
        },
      });

      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Task not found',
        });
      }

      // Delete task from external service
      const taskService = new TaskService(task.workspace.platform);
      await taskService.deleteTask({
        taskId,
        workspace: task.workspace,
      });

      // Delete task from local database
      await ctx.prisma.task.delete({
        where: { id: taskId },
      });

      return { success: true };
    }),

  syncTasks: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workspaceId } = input;
      const userId = ctx.session.user.id;

      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          id: workspaceId,
          userId,
        },
      });

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
        });
      }

      // Sync tasks with external service
      const taskService = new TaskService(workspace.platform);
      const syncedTasks = await taskService.syncTasks(workspace);

      // Update local database with synced tasks
      await Promise.all(
        syncedTasks.map((task: ExternalTask) =>
          ctx.prisma.task.upsert({
            where: {
              id: task.id,
            },
            create: {
              ...task,
              userId,
              workspaceId,
            },
            update: task,
          })
        )
      );

      return { success: true };
    }),
}); 