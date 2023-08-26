import { z } from 'zod';

import { authorizedProcedure } from '../domains/auth/auth.middleware';
import { db } from '../domains/db/db.client';
import { router } from '../trpc';

export const userRouter = router({
	getById: authorizedProcedure.input(z.string()).query(async ({ input }) => {
		return await db.user.findUnique({ where: { id: input } });
	}),
});
