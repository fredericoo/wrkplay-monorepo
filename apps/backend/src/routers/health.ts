import { publicProcedure, router } from '../trpc';

export const healthRouter = router({
	getHealthStatus: publicProcedure.query(async () => {
		return { status: 'healthy', timestamp: Date.now() };
	}),
});
