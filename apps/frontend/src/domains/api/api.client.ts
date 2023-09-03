import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { ENV } from '~/domains/common/common.env';

import type { AppRouter } from '../../../../backend/src';

const BACKEND_URL = new URL(ENV.VITE_BACKEND_URL);
BACKEND_URL.pathname = 'trpc';

export const api = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			fetch: (input, init) => {
				return fetch(input, {
					credentials: 'include',
					...init,
				});
			},
			url: BACKEND_URL.toString(),
		}),
	],
});
