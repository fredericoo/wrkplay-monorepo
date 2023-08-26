import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export const createContext = async (opts: CreateHTTPContextOptions) => {
	const session = opts.req.headers.authorization
		? { user: { id: opts.req.headers.authorization.replace('Bearer ', '') } }
		: undefined;

	return {
		req: opts.req,
		res: opts.res,
		session,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;
