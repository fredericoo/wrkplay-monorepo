import { makeLoader, redirect } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const logoutLoader = makeLoader(async () => {
	try {
		const user = await api.user.me.query();
		return { user };
	} catch {
		return redirect('/login');
	}
});
