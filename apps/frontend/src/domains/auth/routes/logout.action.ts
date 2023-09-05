import { makeAction, redirect } from 'react-router-typesafe';

import { ENV } from '~/domains/common/common.env';

export const logoutAction = makeAction(async () => {
	const logoutUrl = new URL(ENV.VITE_BACKEND_URL);
	logoutUrl.pathname = '/auth/logout';

	try {
		const response = await fetch(logoutUrl, {
			method: 'POST',
			redirect: 'manual',
			credentials: 'include',
			headers: {
				accept: 'application/json',
			},
		});

		if (response.status === 302) {
			return redirect('/');
		}

		return null;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to logout');
	}
});
