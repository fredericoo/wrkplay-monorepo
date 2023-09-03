import { z } from 'zod';

/** Required env variables to start the app. */
const envVariables = z.object({
	MODE: z.enum(['development', 'production']),
	DATABASE_URL: z.string(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
});

export const ENV = envVariables.parse(process.env);
