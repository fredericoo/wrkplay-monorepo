import { CursorPaginationSchema } from '@wrkplay/core';
import { defer, makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';
import { swr } from '~/domains/common/common.cache';

export const indexLoader = makeLoader(async ({ request }) => {
	const searchParams = new URLSearchParams(request.url);
	const search = CursorPaginationSchema.parse(Object.fromEntries(searchParams.entries()));

	return defer({
		matches: await swr({
			cacheKey: ['match.list', search],
			fetchFn: () => api.match.list.query(search),
			staleTimeMs: 5 * 1000,
			onError: 'ignore',
		}),
	});
});
