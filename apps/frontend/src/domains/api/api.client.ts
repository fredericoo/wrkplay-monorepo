import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { ENV } from '~/domains/common/common.env';

import type { AppRouter } from '../../../../backend/src';

export const api = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: ENV.VITE_BACKEND_URL,
		}),
	],
});
