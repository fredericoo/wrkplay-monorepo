import { prisma } from '@lucia-auth/adapter-prisma';
import { github } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { web } from 'lucia/middleware';
import { match, P } from 'ts-pattern';

import { ENV } from '../common/common.env';
import { db } from '../db/db.client';

export const auth = lucia({
	env: ENV.MODE === 'production' ? 'PROD' : 'DEV',
	middleware: web(),
	sessionCookie: {
		expires: false,
	},
	adapter: prisma(db),
	// TODO: csrf protection
	csrfProtection: false,
	getUserAttributes: user => user,
});

export type Auth = typeof auth;

export const githubAuth = match(ENV)
	.with({ GITHUB_CLIENT_ID: P.string, GITHUB_CLIENT_SECRET: P.string }, e =>
		github(auth, {
			clientId: e.GITHUB_CLIENT_ID,
			clientSecret: e.GITHUB_CLIENT_SECRET,
		}),
	)
	.otherwise(() => null);
