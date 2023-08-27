import { CursorPaginationSchema } from '@wrkplay/core';
import { z } from 'zod';

import { authorizedProcedure } from '../domains/auth/auth.middleware';
import { getCursorPagination } from '../domains/common/common.utils';
import { db } from '../domains/db/db.client';
import { getErrorCode, getErrorMessage } from '../domains/error/error.utils';
import { findPendingMatch, isUserInMatch, MatchError } from '../domains/match/match.utils';
import { router } from '../trpc';

export const matchRouter = router({
	list: authorizedProcedure.input(CursorPaginationSchema.optional()).query(async ({ input }) => {
		const pagination = getCursorPagination(input);
		return await db.match.findMany({
			where: { status: 'FINISHED' },
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				createdAt: true,
				sideAScore: true,
				sideBScore: true,
				sideA: { select: { id: true, name: true } },
				sideB: { select: { id: true, name: true } },
				pitch: { select: { id: true, name: true, venue: { select: { id: true, name: true } } } },
			},
			...pagination,
		});
	}),
	current: authorizedProcedure.input(z.object({ pitchId: z.string() })).query(async ({ input }) => {
		const currentMatch = await db.match
			.findFirst({
				where: { pitchId: input.pitchId, status: { not: 'FINISHED' } },
				select: {
					id: true,
					status: true,
					sideA: { select: { id: true, name: true } },
					sideB: { select: { id: true, name: true } },
				},
			})
			.catch(error => {
				console.error(error);
				throw new MatchError({ code: 'NOT_FOUND' });
			});

		return { currentMatch };
	}),
	/** Currently authed user joins match on selected side, or creates it */
	join: authorizedProcedure
		.input(z.object({ pitchId: z.string(), side: z.enum(['sideA', 'sideB']) }))
		.mutation(async ({ input, ctx }) => {
			try {
				const existingMatch = await findPendingMatch(input);

				if (!existingMatch) {
					const created = await db.match
						.create({
							data: {
								pitch: { connect: { id: input.pitchId } },
								[input.side]: { connect: { id: ctx.session.user.id } },
							},
							select: { id: true },
						})
						.catch(error => {
							console.error(error);
							throw new MatchError({ code: 'NOT_FOUND' });
						});

					return { success: true, matchId: created.id };
				}

				if (existingMatch.status === 'STARTED') throw new MatchError({ code: 'ONGOING_MATCH' });

				const isPlayerInMatch = isUserInMatch({ match: existingMatch, user: ctx.session.user });
				if (isPlayerInMatch) throw new MatchError({ code: 'ALREADY_JOINED' });

				const isSideFull = existingMatch[input.side].length >= existingMatch.pitch.maxTeamSize;
				if (isSideFull) throw new MatchError({ code: 'SIDE_FULL' });

				const updated = await db.match.update({
					where: { id: existingMatch.id },
					data: { [input.side]: { connect: { id: ctx.session.user.id } } },
					select: { id: true },
				});
				return { success: true, matchId: updated.id };
			} catch (error) {
				return { success: false, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
			}
		}),
	start: authorizedProcedure.input(z.object({ pitchId: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const existingMatch = await findPendingMatch(input);
			if (!existingMatch) throw new MatchError({ code: 'NOT_FOUND' });

			if (existingMatch.status === 'STARTED') throw new MatchError({ code: 'ALREADY_STARTED' });

			const isPlayerInMatch = isUserInMatch({ match: existingMatch, user: ctx.session.user });
			if (!isPlayerInMatch) throw new MatchError({ code: 'NOT_JOINED' });

			const SideLengthSchema = z
				.number()
				.max(existingMatch.pitch.maxTeamSize, `Maximum team size is ${existingMatch.pitch.maxTeamSize}.`)
				.min(existingMatch.pitch.minTeamSize, `Mininum team size is ${existingMatch.pitch.minTeamSize}.`);

			const sideALength = SideLengthSchema.safeParse(existingMatch.sideA.length);
			if (!sideALength.success)
				throw new MatchError({ code: 'TEAM_SIZE_MISMATCH', message: getErrorMessage(sideALength.error) });
			const sideBLength = SideLengthSchema.safeParse(existingMatch.sideB.length);
			if (!sideBLength.success)
				throw new MatchError({ code: 'TEAM_SIZE_MISMATCH', message: getErrorMessage(sideBLength.error) });

			const started = await db.match.update({
				where: { id: existingMatch.id },
				data: { status: 'STARTED' },
				select: { id: true },
			});
			return { success: true, matchId: started.id };
		} catch (error) {
			return { success: false, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
		}
	}),
	end: authorizedProcedure.input(z.object({ pitchId: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const existingMatch = await findPendingMatch(input);
			if (!existingMatch) throw new MatchError({ code: 'NOT_FOUND' });

			if (existingMatch.status === 'NOT_STARTED') throw new MatchError({ code: 'NOT_STARTED' });

			const isPlayerInMatch = isUserInMatch({ match: existingMatch, user: ctx.session.user });
			if (!isPlayerInMatch) throw new MatchError({ code: 'NOT_JOINED' });

			const ended = await db.match.update({
				where: { id: existingMatch.id },
				data: { status: 'FINISHED' },
				select: { id: true },
			});
			return { success: true, matchId: ended.id };
		} catch (error) {
			return { success: false, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
		}
	}),
});
