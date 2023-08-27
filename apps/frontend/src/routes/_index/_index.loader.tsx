import { CursorPaginationSchema } from '@wrkplay/core';
import { makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const indexLoader = makeLoader(async ({ request }) => {
	const searchParams = new URLSearchParams(request.url);
	const search = CursorPaginationSchema.parse(Object.fromEntries(searchParams.entries()));

	const matches = await api.match.list.query(search);
	return { matches };
});
