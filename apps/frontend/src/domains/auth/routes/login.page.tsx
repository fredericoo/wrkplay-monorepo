import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';
import { CapacitorCookies } from '@capacitor/core';
import { Button } from '@wrkplay/ui';
import type { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import Logo from '~/assets/logo.png';
import { ENV } from '~/domains/common/common.env';
import { usePlatform } from '~/domains/native/native.hooks';

export const LoginPage = () => {
	const platform = usePlatform();

	const loginUrl = new URL(ENV.VITE_BACKEND_URL);
	loginUrl.pathname = '/auth/login/github';

	const handleLogin: MouseEventHandler = e => {
		if (platform === 'web') return;
		e.preventDefault();
		const sheet = InAppBrowser.create(loginUrl.toString(), '_blank', {
			location: 'no',
		});
		sheet.on('message').subscribe(async e => {
			await CapacitorCookies.setCookie({
				key: 'auth_session',
				value: e.data.sessionId,
				path: '/',
			});

			sheet.close();
		});
	};

	return (
		<div className="container flex h-full flex-grow flex-col items-center justify-center gap-8">
			<div className="flex items-center gap-2">
				<img className="h-8 w-8" src={Logo} alt="wrkplay" />
				<h1 className="display-2xs">workplay</h1>
			</div>
			<Button asChild>
				<Link to={loginUrl.toString()} onClick={handleLogin}>
					Sign in with github
				</Link>
			</Button>
		</div>
	);
};
