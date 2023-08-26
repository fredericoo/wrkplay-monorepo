import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { createContext } from './domains/auth/auth.context';
import { healthRouter } from './routers/health';
import { matchRouter } from './routers/match';
import { userRouter } from './routers/user';
import { router } from './trpc';

const PORT = 8080;

const appRouter = router({
	user: userRouter,
	health: healthRouter,
	match: matchRouter,
});

const server = createHTTPServer({
	router: appRouter,
	middleware: cors(),
	createContext,
});

server.listen(PORT);

console.log(`🤖 wrkplay backend listening on port ${PORT}`);
export type AppRouter = typeof appRouter;
