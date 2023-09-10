import { CursorPaginationSchema } from '@wrkplay/core';
import { defer, makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';
import { swr } from '~/domains/common/common.cache';

const ONE_MINUTE_MS = 60 * 1000;

export const venuesLoader = makeLoader(async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const search = CursorPaginationSchema.parse(Object.fromEntries(searchParams.entries()));

	return defer({
		venues: await swr({
			cacheKey: ['venues', 'list', JSON.stringify(search)],
			fetchFn: async () => api.venue.list.query(search),
			onError: 'ignore',
			staleTimeMs: ONE_MINUTE_MS,
		}),
	});
});
