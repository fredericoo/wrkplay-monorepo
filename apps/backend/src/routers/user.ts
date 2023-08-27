import { CursorPaginationSchema } from '@wrkplay/core';
import { z } from 'zod';

import { authorizedProcedure } from '../domains/auth/auth.middleware';
import { getCursorPagination } from '../domains/common/common.utils';
import { db } from '../domains/db/db.client';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
	getById: authorizedProcedure.input(z.string()).query(async ({ input }) => {
		return await db.user.findUnique({ where: { id: input } });
	}),
	list: publicProcedure.input(CursorPaginationSchema.optional()).query(async ({ input }) => {
		const pagination = getCursorPagination(input);
		return await db.user.findMany({
			...pagination,
			orderBy: { id: 'asc' },
			select: { id: true, name: true },
		});
	}),
});
