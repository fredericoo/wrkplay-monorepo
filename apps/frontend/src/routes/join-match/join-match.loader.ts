import { defer, makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const joinMatchLoader = makeLoader(async () => {
	const userId = localStorage.getItem('token');

	if (!userId) {
		return { pendingMatches: [] };
	}

	return defer({ pendingMatches: api.user.pendingMatches.query({ userId }) });
});
