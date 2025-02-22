import { PrismaClient } from '@prisma/client';

export interface AnalyticsMetrics {
  tasks: {
    total: number;
    completed: number;
    growth: number;
  };
  aiResponses: {
    total: number;
    emails: number;
    chats: number;
    documents: number;
    growth: number;
  };
  timeSaved: {
    hours: number;
    growth: number;
  };
  workspaces: {
    active: number;
    total: number;
    distribution: Array<{
      name: string;
      tasks: number;
      completion: number;
    }>;
  };
}

interface WorkspaceWithCounts {
  id: string;
  name: string;
  platform: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    tasks: number;
  };
  tasks: Array<{
    id: string;
    status: string;
  }>;
}

export class AnalyticsService {
  constructor(private prisma: PrismaClient) {}

  async getMetrics(userId: string): Promise<AnalyticsMetrics> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Get task metrics
    const [currentMonthTasks, lastMonthTasks] = await Promise.all([
      this.prisma.task.count({
        where: {
          userId,
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      }),
      this.prisma.task.count({
        where: {
          userId,
          createdAt: {
            gte: firstDayOfLastMonth,
            lte: firstDayOfMonth,
          },
        },
      }),
    ]);

    // Get AI response metrics
    const [currentMonthEmails, currentMonthMessages] = await Promise.all([
      this.prisma.email.count({
        where: {
          userId,
          aiResponse: { not: null },
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      }),
      this.prisma.message.count({
        where: {
          userId,
          aiResponse: { not: null },
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      }),
    ]);

    // Get workspace metrics
    const workspaces = await this.prisma.workspace.findMany({
      where: { userId },
      include: {
        _count: {
          select: { tasks: true },
        },
        tasks: {
          where: { status: 'done' },
        },
      },
    });

    const workspaceMetrics = workspaces.map((workspace: WorkspaceWithCounts) => ({
      name: workspace.name,
      tasks: workspace._count.tasks,
      completion: workspace.tasks.length / workspace._count.tasks * 100,
    }));

    // Calculate growth rates
    const taskGrowth = lastMonthTasks === 0 ? 100 : 
      ((currentMonthTasks - lastMonthTasks) / lastMonthTasks) * 100;

    return {
      tasks: {
        total: currentMonthTasks,
        completed: await this.prisma.task.count({
          where: {
            userId,
            status: 'done',
            createdAt: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth,
            },
          },
        }),
        growth: taskGrowth,
      },
      aiResponses: {
        total: currentMonthEmails + currentMonthMessages,
        emails: currentMonthEmails,
        chats: currentMonthMessages,
        documents: await this.prisma.document.count({
          where: {
            userId,
            aiGenerated: true,
            createdAt: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth,
            },
          },
        }),
        growth: 23, // Example value, should be calculated based on historical data
      },
      timeSaved: {
        hours: 24, // Example value, should be calculated based on task completion times
        growth: 15, // Example value, should be calculated based on historical data
      },
      workspaces: {
        active: workspaces.length,
        total: workspaces.length,
        distribution: workspaceMetrics,
      },
    };
  }

  async getActivityTimeline(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activities = await this.prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        'task' as type
      FROM "Task"
      WHERE user_id = ${userId}
        AND created_at >= ${startDate}
      GROUP BY DATE(created_at)
      
      UNION ALL
      
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        'email' as type
      FROM "Email"
      WHERE user_id = ${userId}
        AND created_at >= ${startDate}
        AND ai_response IS NOT NULL
      GROUP BY DATE(created_at)
      
      ORDER BY date ASC
    `;

    return activities;
  }

  async getAIQualityMetrics(userId: string) {
    // This would typically involve analyzing user feedback, response rates,
    // and other quality indicators. For now, we'll return example data.
    return {
      accuracy: 92,
      responseTime: 1.5,
      userSatisfaction: 88,
      improvementRate: 5,
    };
  }
} 