import { CursorPaginationSchema, MatchError } from '@wrkplay/core';
import { match, P } from 'ts-pattern';
import { z } from 'zod';

import { authorizedProcedure } from '../domains/auth/auth.middleware';
import { getCursorPagination } from '../domains/common/common.utils';
import { db } from '../domains/db/db.client';
import { getErrorCode, getErrorMessage } from '../domains/error/error.utils';
import { findPendingMatch } from '../domains/match/match.utils';
import { router } from '../trpc';

export const matchRouter = router({
	getById: authorizedProcedure.input(z.object({ matchId: z.string() })).query(async ({ input }) => {
		const match = await db.match
			.findUniqueOrThrow({
				where: { id: input.matchId },
				select: {
					id: true,
					status: true,
					createdAt: true,
					sideAScore: true,
					sideBScore: true,
					players: {
						select: {
							id: true,
							user: {
								select: {
									id: true,
									name: true,
								},
							},
							side: true,
							state: true,
						},
					},
					pitch: { select: { id: true, name: true, venue: { select: { id: true, name: true } } } },
				},
			})
			.catch(error => {
				console.error(error);
				throw new MatchError({ code: 'NOT_FOUND' });
			});

		return { match };
	}),
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
				players: {
					select: {
						id: true,
						user: {
							select: {
								name: true,
							},
						},
						side: true,
						state: true,
					},
				},
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
					players: {
						select: {
							user: {
								select: {
									name: true,
								},
							},
							side: true,
							state: true,
						},
					},
				},
			})
			.catch(error => {
				console.error(error);
				throw new MatchError({ code: 'NOT_FOUND' });
			});

		return { currentMatch };
	}),
	/** Currently authed user joins match on selected side, or creates it */
	join: authorizedProcedure.input(z.object({ joinTag: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const { pitchId, side } = await db.joinTag
				.findUniqueOrThrow({ where: { id: input.joinTag }, select: { pitchId: true, side: true } })
				.catch(error => {
					console.error(error);
					throw new MatchError({ code: 'INVALID_TAG' });
				});

			const existingMatch = await findPendingMatch({ pitchId });

			if (!existingMatch) {
				const created = await db.match
					.create({
						data: {
							pitch: { connect: { id: pitchId } },
							players: { create: { user: { connect: { id: ctx.session.user.id } }, side } },
						},
						select: { id: true },
					})
					.catch(error => {
						console.error(error);
						throw new MatchError({ code: 'NOT_FOUND' });
					});

				return { success: true as const, matchId: created.id };
			}

			if (existingMatch.status === 'STARTED') throw new MatchError({ code: 'ONGOING_MATCH' });

			const isUserInMatch = existingMatch.players.some(player => player.user.id === ctx.session.user.id);
			if (isUserInMatch) throw new MatchError({ code: 'ALREADY_JOINED' });

			const playersOnSide = existingMatch.players.filter(player => player.side === side);
			const isSideFull = playersOnSide.length >= existingMatch.pitch.maxTeamSize;
			if (isSideFull) throw new MatchError({ code: 'SIDE_FULL' });

			await db.matchPlayer.create({
				data: {
					match: { connect: { id: existingMatch.id } },
					user: { connect: { id: ctx.session.user.userId } },
					side,
				},
			});
			return { success: true as const, matchId: existingMatch.id };
		} catch (error) {
			return { success: false as const, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
		}
	}),
	/** Toggles currently signed in user as READY or NOT_READY */
	ready: authorizedProcedure.input(z.object({ matchPlayerId: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const matchPlayer = await db.matchPlayer
				.findUniqueOrThrow({
					where: { id: input.matchPlayerId },
					select: { id: true, match: { select: { pitchId: true } }, userId: true },
				})
				.catch(error => {
					console.error(error);
					throw new MatchError({ code: 'NOT_FOUND' });
				});

			const existingMatch = await findPendingMatch({ pitchId: matchPlayer.match.pitchId });

			return match(existingMatch)
				.with(P.nullish, () => {
					throw new MatchError({ code: 'NOT_FOUND' });
				})
				.with({ status: 'STARTED' }, () => {
					throw new MatchError({ code: 'ALREADY_STARTED' });
				})
				.with({ status: 'FINISHED' }, () => {
					throw new MatchError({ code: 'ALREADY_FINISHED' });
				})
				.with({ status: 'NOT_STARTED' }, async match => {
					const isUserInMatch = match.players.some(player => player.user.id === ctx.session.user.id);
					if (!isUserInMatch) throw new MatchError({ code: 'NOT_IN_MATCH' });

					const isUserReady = match.players.some(
						player => player.user.id === ctx.session.user.id && player.state === 'READY',
					);

					await db.matchPlayer.update({
						where: { id: matchPlayer.id },
						data: { state: isUserReady ? 'NOT_READY' : 'READY' },
						select: { id: true },
					});
					return { success: true, matchId: match.id };
				})
				.exhaustive();
		} catch (error) {
			return { success: false, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
		}
	}),
	leave: authorizedProcedure.input(z.object({ matchPlayerId: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const matchPlayer = await db.matchPlayer
				.findUniqueOrThrow({
					where: { id: input.matchPlayerId },
					select: { id: true, match: { select: { pitchId: true } }, userId: true },
				})
				.catch(error => {
					console.error(error);
					throw new MatchError({ code: 'NOT_FOUND' });
				});

			const existingMatch = await findPendingMatch({ pitchId: matchPlayer.match.pitchId });

			return match(existingMatch)
				.with(P.nullish, () => {
					throw new MatchError({ code: 'NOT_FOUND' });
				})
				.with({ status: 'STARTED' }, () => {
					throw new MatchError({ code: 'ALREADY_STARTED' });
				})
				.with({ status: 'FINISHED' }, () => {
					throw new MatchError({ code: 'ALREADY_FINISHED' });
				})
				.with({ status: 'NOT_STARTED' }, async match => {
					const isUserInMatch = match.players.some(player => player.user.id === ctx.session.user.id);
					if (!isUserInMatch) throw new MatchError({ code: 'NOT_IN_MATCH' });

					await db.matchPlayer.delete({ where: { id: matchPlayer.id } });
					return { success: true, matchId: match.id };
				})
				.exhaustive();
		} catch (error) {
			return { success: false, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
		}
	}),
	/** Starts current match at pitchId */
	start: authorizedProcedure.input(z.object({ matchId: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const existingMatch = await db.match
				.findUniqueOrThrow({
					where: { id: input.matchId },
					select: {
						id: true,
						status: true,
						pitch: {
							select: {
								maxTeamSize: true,
								minTeamSize: true,
							},
						},
						players: {
							select: {
								side: true,
								state: true,
								user: {
									select: {
										id: true,
									},
								},
							},
						},
					},
				})
				.catch(error => {
					console.error(error);
					throw new MatchError({ code: 'NOT_FOUND' });
				});

			if (existingMatch.status === 'STARTED') throw new MatchError({ code: 'ALREADY_STARTED' });

			const isUserInMatch = existingMatch.players.some(player => player.user.id === ctx.session.user.id);
			if (!isUserInMatch) throw new MatchError({ code: 'NOT_IN_MATCH' });

			const areAllPlayersReady = existingMatch.players.every(player => player.state === 'READY');
			if (!areAllPlayersReady) throw new MatchError({ code: 'NOT_READY' });

			const SideLengthSchema = z
				.number()
				.max(existingMatch.pitch.maxTeamSize, `Maximum team size is ${existingMatch.pitch.maxTeamSize}.`)
				.min(existingMatch.pitch.minTeamSize, `Mininum team size is ${existingMatch.pitch.minTeamSize}.`);
			const SideLengthsSchema = z.object({ SIDE_A: SideLengthSchema, SIDE_B: SideLengthSchema });

			const validateLengths = SideLengthsSchema.safeParse({
				SIDE_A: existingMatch.players.filter(player => player.side === 'SIDE_A').length,
				SIDE_B: existingMatch.players.filter(player => player.side === 'SIDE_B').length,
			});
			if (!validateLengths.success)
				throw new MatchError({ code: 'TEAM_SIZE_MISMATCH', message: getErrorMessage(validateLengths.error) });

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
	end: authorizedProcedure.input(z.object({ matchId: z.string() })).mutation(async ({ input, ctx }) => {
		try {
			const existingMatch = await db.match
				.findUniqueOrThrow({
					where: { id: input.matchId },
					select: {
						id: true,
						status: true,
						pitch: {
							select: {
								maxTeamSize: true,
								minTeamSize: true,
							},
						},
						players: {
							select: {
								state: true,
								user: {
									select: {
										id: true,
									},
								},
							},
						},
					},
				})
				.catch(error => {
					console.error(error);
					throw new MatchError({ code: 'NOT_FOUND' });
				});

			if (existingMatch.status === 'NOT_STARTED') throw new MatchError({ code: 'NOT_STARTED' });
			if (existingMatch.status === 'FINISHED') throw new MatchError({ code: 'ALREADY_FINISHED' });

			const isUserInMatch = existingMatch.players.some(player => player.user.id === ctx.session.user.id);
			if (!isUserInMatch) throw new MatchError({ code: 'NOT_IN_MATCH' });

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
	updateScore: authorizedProcedure
		.input(z.object({ matchId: z.string(), side: z.enum(['SIDE_A', 'SIDE_B']), score: z.number() }))
		.mutation(async ({ input, ctx }) => {
			try {
				if (input.score < 0) throw new MatchError({ code: 'INVALID_SCORE' });

				const existingMatch = await db.match
					.findUniqueOrThrow({
						where: { id: input.matchId },
						select: {
							id: true,
							status: true,
							sideAScore: true,
							sideBScore: true,
							pitch: {
								select: {
									maxTeamSize: true,
									minTeamSize: true,
								},
							},
							players: {
								select: {
									state: true,
									user: {
										select: {
											id: true,
										},
									},
								},
							},
						},
					})
					.catch(error => {
						console.error(error);
						throw new MatchError({ code: 'NOT_FOUND' });
					});

				if (existingMatch.status === 'NOT_STARTED') throw new MatchError({ code: 'NOT_STARTED' });
				if (existingMatch.status === 'FINISHED') throw new MatchError({ code: 'ALREADY_FINISHED' });

				const isUserInMatch = existingMatch.players.some(player => player.user.id === ctx.session.user.id);
				if (!isUserInMatch) throw new MatchError({ code: 'NOT_IN_MATCH' });

				const keyToUpdate = input.side === 'SIDE_A' ? 'sideAScore' : 'sideBScore';

				const updated = await db.match.update({
					where: { id: existingMatch.id },
					data: { [keyToUpdate]: input.score },
					select: { id: true },
				});
				return { success: true, matchId: updated.id };
			} catch (error) {
				return { success: false, error: { code: getErrorCode(error), message: getErrorMessage(error) } };
			}
		}),
});
