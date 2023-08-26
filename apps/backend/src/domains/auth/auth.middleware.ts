import { TRPCError } from '@trpc/server';

import { publicProcedure, t } from '../../trpc';

export const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.session) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}
	return next({
		ctx: {
			// Infers the `session` as non-nullable
			session: ctx.session,
		},
	});
});

export const authorizedProcedure = publicProcedure.use(isAuthed);
