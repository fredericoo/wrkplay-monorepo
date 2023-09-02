import type { AnyRouter, inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFn } from '@trpc/server/adapters/fetch';

export const createContext: FetchCreateContextFn<AnyRouter> = async ({ req, resHeaders }) => {
	const authHeader = req.headers.get('authorization');
	const session = authHeader ? { user: { id: authHeader.replace('Bearer ', '') } } : undefined;

	return {
		session,
		req,
		resHeaders,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;
