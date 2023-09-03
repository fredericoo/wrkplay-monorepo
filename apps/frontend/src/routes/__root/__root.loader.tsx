import { SplashScreen } from '@capacitor/splash-screen';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { makeLoader, redirect } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const rootLoader = makeLoader(async () => {
	const safeArea = await SafeArea.getSafeAreaInsets();
	await SplashScreen.hide();

	try {
		console.log('requesting user with cookie', document.cookie);
		const user = await api.user.me.query();
		return { user, safeArea };
	} catch (e) {
		console.log('failed user', e);
		console.error(e);
		return redirect('/login');
	}
});
