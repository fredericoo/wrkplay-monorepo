import { trpcServer } from '@hono/trpc-server';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { serializeCookie } from 'lucia/utils';
import { customAlphabet } from 'nanoid';

import { createContext } from './domains/auth/auth.context';
import { auth, githubAuth } from './domains/auth/auth.service';
import { ENV } from './domains/common/common.env';
import { matchRouter } from './routers/match';
import { userRouter } from './routers/user';
import { router } from './trpc';

const nanoid = customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnmQWEASDZXCRTYFGHVBNUIOPJKLM!@$*', 12);
const PORT = 8080;

const app = new Hono();

app.get('/health', c => {
	return c.json({ status: 'healthy', timestamp: Date.now() });
});

app.get('/login/github', async () => {
	const [url, state] = await githubAuth.getAuthorizationUrl();

	const stateCookie = serializeCookie('github_oauth_state', state, {
		httpOnly: true,
		secure: ENV.MODE === 'production',
		path: '/',
		maxAge: 60 * 60,
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
			'Set-Cookie': stateCookie,
		},
	});
});

app.get('/login/github/callback', async context => {
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
		sessionCookie.attributes.domain = requestUrl.host.replace('api.', '');

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
						webkit?.messageHandlers?.cordova_iab?.postMessage(stringifiedMessageObj);

						window.location = '${redirectUrl}';
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

const appRouter = router({
	user: userRouter,
	match: matchRouter,
});

app.use(
	'/trpc/*',
	cors({ origin: ['http://localhost:3000', 'capacitor://localhost'], credentials: true }),
	trpcServer({
		router: appRouter,
		createContext,
	}),
);

console.log(`🤖 wrkplay backend listening on port ${PORT}`);
export type AppRouter = typeof appRouter;

export default {
	port: PORT,
	fetch: app.fetch,
};
