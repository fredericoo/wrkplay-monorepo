import type { cors } from 'hono/cors';

type CORSOptions = Parameters<typeof cors>[0];

export const CORS_OPTIONS: CORSOptions = {
	origin: ['http://localhost:3000', 'capacitor://localhost', 'https://workplay.app'],
	credentials: true,
};
