import { router, protectedProcedure } from '../trpc';
import { AnalyticsService } from '@/lib/analytics/analytics-service';

export const analyticsRouter = router({
  getMetrics: protectedProcedure
    .query(async ({ ctx }) => {
      const analyticsService = new AnalyticsService(ctx.prisma);
      return analyticsService.getMetrics(ctx.session.user.id);
    }),

  getAIQualityMetrics: protectedProcedure
    .query(async ({ ctx }) => {
      const analyticsService = new AnalyticsService(ctx.prisma);
      return analyticsService.getAIQualityMetrics(ctx.session.user.id);
    }),

  getActivityTimeline: protectedProcedure
    .query(async ({ ctx }) => {
      const analyticsService = new AnalyticsService(ctx.prisma);
      return analyticsService.getActivityTimeline(ctx.session.user.id);
    }),
}); 