import { router } from '../trpc';
import { authRouter } from './auth';
import { emailRouter } from './email';
import { messageRouter } from './message';
import { calendarRouter } from './calendar';
import { documentRouter } from './document';
import { taskRouter } from './task';
import { workspaceRouter } from './workspace';
import { settingsRouter } from './settings';
import { analyticsRouter } from './analytics';

export const appRouter = router({
  auth: authRouter,
  email: emailRouter,
  message: messageRouter,
  calendar: calendarRouter,
  document: documentRouter,
  task: taskRouter,
  workspace: workspaceRouter,
  settings: settingsRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter; 