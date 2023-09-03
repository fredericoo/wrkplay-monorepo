import { prisma } from '@lucia-auth/adapter-prisma';
import { github } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { web } from 'lucia/middleware';

import { ENV } from '../common/common.env';
import { db } from '../db/db.client';

export const auth = lucia({
	env: ENV.MODE === 'production' ? 'PROD' : 'DEV',
	middleware: web(),
	sessionCookie: {
		expires: false,
	},
	adapter: prisma(db),
});

export type Auth = typeof auth;

export const githubAuth = github(auth, {
	clientId: ENV.GITHUB_CLIENT_ID,
	clientSecret: ENV.GITHUB_CLIENT_SECRET,
});
