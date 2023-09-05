import { OAuthRequestError } from '@lucia-auth/oauth';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { serializeCookie } from 'lucia/utils';

import { ENV } from '../common/common.env';
import { nanoid } from '../common/common.utils';
import { auth, githubAuth } from './auth.service';

export const authRouter = new Hono();

authRouter.get('/login/github', async c => {
	const [url, state] = await githubAuth.getAuthorizationUrl();
	const requestUrl = new URL(c.req.url);

	const stateCookie = serializeCookie('github_oauth_state', state, {
		httpOnly: true,
		secure: ENV.MODE === 'production',
		path: '/',
		maxAge: 60 * 60,
		domain: ENV.MODE === 'production' ? requestUrl.host.replace('api.', '') : undefined,
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
			'Set-Cookie': stateCookie,
		},
	});
});

authRouter.get('/login/github/callback', async context => {
	const storedState = getCookie(context, 'github_oauth_state');
	const redirectUrl = ENV.AUTH_REDIRECT_URL;
	const { code, state } = context.req.query();
	const requestUrl = new URL(context.req.url);

	// validate state
	if (!storedState || !state || storedState !== state || typeof code !== 'string') {
		console.error('Missing one of', storedState, state, code);
		return context.text('Bad request', 400);
	}
	try {
		const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				userId: nanoid(),
				attributes: {
					name: githubUser.name ?? 'Anonymous',
					avatar_url: githubUser.avatar_url,
				},
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		const sessionCookie = auth.createSessionCookie(session);
		if (ENV.MODE === 'production') {
			sessionCookie.attributes.domain = requestUrl.host.replace('api.', '');
		}

		context.res.headers.set('Set-Cookie', sessionCookie.serialize());
		return context.html(`
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8" />
					<title>Redirecting...</title>
					<script>
						const sessionId = ${JSON.stringify(session.sessionId)};
						const messageObj = {sessionId: sessionId};
						const stringifiedMessageObj = JSON.stringify(messageObj);

						try {
							webkit?.messageHandlers?.cordova_iab?.postMessage(stringifiedMessageObj);
						} catch {}

						setTimeout(() => {
							window.location.replace('${redirectUrl}');
						}, 100);
					</script>
				</head>
				<body>
					<p>Redirecting...</p>
					<p>If you are not redirected, <a href="${redirectUrl}">click here</a>.</p>
				</body>
			</html>`);
	} catch (e) {
		console.error(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return context.text('Bad request', 400);
		}
		return context.text('An unknown error occurred', 500);
	}
});
