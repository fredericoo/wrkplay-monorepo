import { CursorPaginationSchema } from '@wrkplay/core';
import { z } from 'zod';

import { publicProcedure, router } from '../../trpc';
import { authorizedProcedure } from '../auth/auth.middleware';
import { getCursorPagination } from '../common/common.utils';
import { db } from '../db/db.client';

export const userRouter = router({
	me: authorizedProcedure.query(async ({ ctx }) => {
		return await db.user.findUniqueOrThrow({ where: { id: ctx.session.user.userId } });
	}),
	getById: authorizedProcedure.input(z.string()).query(async ({ input }) => {
		return await db.user.findUnique({ where: { id: input } });
	}),
	list: publicProcedure.input(CursorPaginationSchema.optional()).query(async ({ input }) => {
		const pagination = getCursorPagination(input);
		return await db.user.findMany({
			...pagination,
			orderBy: { id: 'asc' },
			select: { id: true, name: true, avatar_url: true },
		});
	}),
	pendingMatches: authorizedProcedure
		.input(z.intersection(CursorPaginationSchema.optional(), z.object({ userId: z.string() })))
		.query(async ({ input }) => {
			const pagination = getCursorPagination(input);

			return await db.match.findMany({
				...pagination,
				where: { status: { in: ['NOT_STARTED', 'STARTED'] }, players: { some: { userId: input.userId } } },
				select: {
					id: true,
					pitch: { select: { name: true, venue: { select: { name: true } } } },
					createdAt: true,
				},
			});
		}),
});
