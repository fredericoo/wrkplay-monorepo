import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.wrkplay.app',
	appName: 'wrkplay',
	webDir: 'dist',
	server: {
		androidScheme: 'https',
	},
	plugins: {
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
