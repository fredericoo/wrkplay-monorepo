import { SplashScreen } from '@capacitor/splash-screen';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { makeLoader } from 'react-router-typesafe';

export const rootLoader = makeLoader(async () => {
	const safeArea = await SafeArea.getSafeAreaInsets();
	await SplashScreen.hide();

	return { safeArea };
});
