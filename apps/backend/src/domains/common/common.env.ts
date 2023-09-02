import { z } from 'zod';

/** Required env variables to start the app. */
const envVariables = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	DATABASE_URL: z.string(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
});

export const ENV = envVariables.parse(process.env);
