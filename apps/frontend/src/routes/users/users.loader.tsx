import { CursorPaginationSchema } from '@wrkplay/core';
import { defer, makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const usersLoader = makeLoader(async ({ request }) => {
	const searchParams = new URLSearchParams(request.url);
	const search = CursorPaginationSchema.parse(Object.fromEntries(searchParams.entries()));

	return defer({ users: api.user.list.query(search) });
});
