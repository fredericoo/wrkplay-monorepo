import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';
import { Capacitor } from '@capacitor/core';
import { makeLoader, redirect } from 'react-router-typesafe';

import { ENV } from '~/domains/common/common.env';

export const loginLoader = makeLoader(async () => {
	const isWeb = Capacitor.getPlatform() === 'web';
	const loginUrl = new URL(ENV.VITE_BACKEND_URL);
	loginUrl.pathname = '/login/github';
	if (isWeb) {
		return redirect(loginUrl.toString());
	}
	const sheet = InAppBrowser.create(loginUrl.toString(), '_blank', {
		location: 'no',
	});

	return sheet;
});
