import { SplashScreen } from '@capacitor/splash-screen';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { makeLoader } from 'react-router-typesafe';

import { api } from '~/domains/api/api.client';

export const rootLoader = makeLoader(async () => {
	const userId = localStorage.getItem('token')?.toString();
	const safeArea = await SafeArea.getSafeAreaInsets();
	await SplashScreen.hide();

	const user = userId ? (await api.user.getById.query(userId)) ?? null : null;

	return { user, safeArea };
});
