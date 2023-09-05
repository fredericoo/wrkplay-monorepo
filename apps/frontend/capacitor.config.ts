import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.workplay.app',
	appName: 'workplay',
	webDir: 'dist',
	server: {
		androidScheme: 'https',
	},
	plugins: {
		CapacitorCookies: {
			enabled: true,
		},
		SplashScreen: {
			launchAutoHide: false,
			launchFadeOutDuration: 1000,
			androidSplashResourceName: 'splash',
			androidScaleType: 'CENTER_CROP',
			useDialog: true,
		},
	},
};

export default config;
