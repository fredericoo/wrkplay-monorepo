import { CursorPaginationSchema } from '@wrkplay/core';
import { makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const usersLoader = makeLoader(async ({ request }) => {
	const searchParams = new URLSearchParams(request.url);
	const search = CursorPaginationSchema.parse(Object.fromEntries(searchParams.entries()));

	const users = await api.user.list.query(search);
	return { users };
});
