import { initTRPC } from '@trpc/server';

import type { createContext } from './domains/auth/auth.context';

export const t = initTRPC.context<typeof createContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the app
 */
export const router = t.router;
export const publicProcedure = t.procedure;
