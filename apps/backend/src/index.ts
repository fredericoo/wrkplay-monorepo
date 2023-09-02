import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { createContext } from './domains/auth/auth.context';
import { matchRouter } from './routers/match';
import { userRouter } from './routers/user';
import { router } from './trpc';

const PORT = 8080;

const app = new Hono();

app.get('/health', c => {
	return c.json({ status: 'healthy', timestamp: Date.now() });
});

const appRouter = router({
	user: userRouter,
	match: matchRouter,
});

app.use(
	'/trpc/*',
	cors(),
	trpcServer({
		router: appRouter,
		createContext,
	}),
);

console.log(`🤖 wrkplay backend listening on port ${PORT}`);
export type AppRouter = typeof appRouter;

export default {
	port: PORT,
	fetch: app.fetch,
};
