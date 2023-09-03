import { CapacitorCookies } from '@capacitor/core';
import { Button } from '@wrkplay/ui';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-typesafe';

import type { loginLoader } from './login.loader';

export const LoginPage = () => {
	const navigate = useNavigate();
	const sheet = useLoaderData<typeof loginLoader>();
	const [sessionId, setSessionId] = useState<string>();

	useEffect(() => {
		sheet.on('message').subscribe(async e => {
			setSessionId(e.data);
			await CapacitorCookies.setCookie({
				key: 'auth_session',
				value: e.data.sessionId,
				path: '/',
			});

			sheet.close();
		});
	}, [navigate, sheet]);

	return (
		<div className="container flex h-full flex-grow flex-col items-center gap-4">
			<p className="text-icon-highcontrast-neutral body-md">Logging you in…</p>
			<p>{JSON.stringify(sessionId)}</p>
			<p>{document.cookie}</p>
			<Button asChild>
				<Link to="/">Back</Link>
			</Button>
		</div>
	);
};
