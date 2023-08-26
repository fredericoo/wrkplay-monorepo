import { z } from 'zod';

/** Required env variables to start the app. */
const envVariables = z.object({
	VITE_BACKEND_URL: z.string(),
	MODE: z.enum(['development', 'production', 'test']),
});

export const ENV = envVariables.parse(import.meta.env);
