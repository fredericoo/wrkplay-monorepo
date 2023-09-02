import { prisma } from '@lucia-auth/adapter-prisma';
import { github } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { node } from 'lucia/middleware';

import { ENV } from '../common/common.env';
import { db } from '../db/db.client';

export const auth = lucia({
	env: ENV.NODE_ENV === 'production' ? 'PROD' : 'DEV',
	middleware: node(),
	adapter: prisma(db),
});

export type Auth = typeof auth;

export const githubAuth = github(auth, {
	clientId: ENV.GITHUB_CLIENT_ID,
	clientSecret: ENV.GITHUB_CLIENT_SECRET,
});
