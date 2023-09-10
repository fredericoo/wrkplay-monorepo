import { CursorPaginationSchema } from '@wrkplay/core';
import { defer, makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';
import { swr } from '~/domains/common/common.cache';

export const indexLoader = makeLoader(async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const search = CursorPaginationSchema.parse(Object.fromEntries(searchParams.entries()));

	console.log(search, searchParams.get('first'), request.url);
	console.log(['match', 'list', JSON.stringify(search)]);

	return defer({
		matches: await swr({
			cacheKey: ['match', 'list', JSON.stringify(search)],
			fetchFn: () => api.match.list.query(search, { signal: request.signal }),
			staleTimeMs: 5 * 1000,
			onError: 'ignore',
		}),
	});
});
