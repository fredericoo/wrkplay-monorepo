import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { createContext } from './domains/auth/auth.context';
import { authRouter } from './domains/auth/auth.router';
import { CORS_OPTIONS } from './domains/common/common.constants';
import { matchRouter } from './domains/match/match.router';
import { userRouter } from './domains/user/user.router';
import { router } from './trpc';

const PORT = 8080;

const app = new Hono();

app.route('/auth', authRouter);

app.get('/health', c => {
	return c.json({ status: 'healthy', timestamp: Date.now() });
});

const appRouter = router({
	user: userRouter,
	match: matchRouter,
});

app.use(
	'/trpc/*',
	cors(CORS_OPTIONS),
	trpcServer({
		router: appRouter,
		createContext,
	}),
);

console.log(`🤖 workplay backend listening on port ${PORT}`);
export type AppRouter = typeof appRouter;

export default {
	port: PORT,
	fetch: app.fetch,
};
