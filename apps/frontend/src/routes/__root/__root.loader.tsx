import { makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const rootLoader = makeLoader(async () => {
	const userId = localStorage.getItem('token')?.toString();

	const user = userId ? (await api.user.getById.query(userId)) ?? null : null;

	return { user };
});
