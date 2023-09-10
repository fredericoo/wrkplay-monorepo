import { CursorPaginationSchema } from '@wrkplay/core';

import { publicProcedure, router } from '../../trpc';
import { getCursorPagination } from '../common/common.utils';
import { db } from '../db/db.client';

export const venueRouter = router({
	list: publicProcedure.input(CursorPaginationSchema.optional()).query(async ({ input }) => {
		const pagination = getCursorPagination(input);
		return await db.venue.findMany({
			...pagination,
			orderBy: { id: 'asc' },
			select: {
				id: true,
				name: true,
				website: true,
				cover_url: true,
				logo_url: true,
				description: true,

				dict_pitch_plural: true,
				dict_pitch_singular: true,

				_count: { select: { pitches: true } },
			},
		});
	}),
});
