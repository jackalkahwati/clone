import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { CalendarService } from '@/lib/calendar/calendar-service';

export const calendarRouter = router({
  getEvents: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        provider: z.enum(['google', 'outlook']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate, provider } = input;
      const userId = ctx.session.user.id;

      const events = await ctx.prisma.event.findMany({
        where: {
          calendar: {
            userId,
            ...(provider && { provider }),
          },
          startTime: {
            gte: startDate,
          },
          endTime: {
            lte: endDate,
          },
        },
        include: {
          calendar: true,
        },
        orderBy: {
          startTime: 'asc',
        },
      });

      return { events };
    }),

  createEvent: protectedProcedure
    .input(
      z.object({
        calendarId: z.string(),
        title: z.string(),
        description: z.string().optional(),
        startTime: z.date(),
        endTime: z.date(),
        attendees: z.array(z.string()),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { calendarId, ...eventData } = input;
      const userId = ctx.session.user.id;

      const calendar = await ctx.prisma.calendar.findUnique({
        where: {
          id: calendarId,
          userId,
        },
      });

      if (!calendar) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Calendar not found',
        });
      }

      const calendarService = new CalendarService();
      const externalEventId = await calendarService.createEvent({
        provider: calendar.provider,
        ...eventData,
      });

      const event = await ctx.prisma.event.create({
        data: {
          ...eventData,
          calendarId,
          status: 'confirmed',
        },
      });

      return { event };
    }),

  updateEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        startTime: z.date().optional(),
        endTime: z.date().optional(),
        attendees: z.array(z.string()).optional(),
        location: z.string().optional(),
        status: z.enum(['confirmed', 'tentative', 'cancelled']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, ...updateData } = input;
      const userId = ctx.session.user.id;

      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
        include: {
          calendar: {
            select: {
              userId: true,
              provider: true,
            },
          },
        },
      });

      if (!event || event.calendar.userId !== userId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Event not found',
        });
      }

      const calendarService = new CalendarService();
      await calendarService.updateEvent({
        provider: event.calendar.provider,
        eventId,
        ...updateData,
      });

      const updatedEvent = await ctx.prisma.event.update({
        where: { id: eventId },
        data: updateData,
      });

      return { event: updatedEvent };
    }),

  deleteEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId } = input;
      const userId = ctx.session.user.id;

      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
        include: {
          calendar: {
            select: {
              userId: true,
              provider: true,
            },
          },
        },
      });

      if (!event || event.calendar.userId !== userId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Event not found',
        });
      }

      const calendarService = new CalendarService();
      await calendarService.deleteEvent({
        provider: event.calendar.provider,
        eventId,
      });

      await ctx.prisma.event.delete({
        where: { id: eventId },
      });

      return { success: true };
    }),
}); 