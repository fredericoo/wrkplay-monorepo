import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

import { auth } from './auth.service';

export const createContext = async ({ req, resHeaders }: FetchCreateContextFnOptions) => {
	const authRequest = auth.handleRequest(req);
	const session = await authRequest.validate();

	return {
		session,
		req,
		resHeaders,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;
