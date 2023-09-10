import { z } from 'zod';

/** Required env variables to start the app. */
const envVariables = z.object({
	MODE: z.enum(['development', 'production']),
	DATABASE_URL: z.string(),
	GITHUB_CLIENT_ID: z.string().optional(),
	GITHUB_CLIENT_SECRET: z.string().optional(),
	GOOGLE_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),
	AUTH_REDIRECT_URL: z.string(),
});

export const ENV = envVariables.parse(process.env);
