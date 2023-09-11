import { makeLoader, redirect } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const authLoader = makeLoader(async () => {
	try {
		const user = await api.user.me.query();
		return { user };
	} catch (e) {
		console.error(e);
		return redirect('/login');
	}
});
