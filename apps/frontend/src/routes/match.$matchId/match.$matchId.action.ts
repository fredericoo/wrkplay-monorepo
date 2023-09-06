import { CursorPaginationSchema, MatchError } from '@wrkplay/core';
import { makeAction, redirect } from 'react-router-typesafe';
import { match } from 'ts-pattern';
import { z } from 'zod';

import { api } from '~/domains/api/api.client';
import { markAsStale } from '~/domains/common/common.cache';
import { isInstanceOf } from '~/domains/common/common.utils';

const ActionSchema = z.union([
	z.object({
		intent: z.literal('ready'),
		matchPlayerId: z.string(),
	}),
	z.object({
		intent: z.literal('start'),
	}),
	z.object({
		intent: z.literal('end'),
	}),
	z.object({
		intent: z.literal('leave'),
		matchPlayerId: z.string(),
	}),
	z.object({
		intent: z.literal('update_score'),
		score: z.coerce.number(),
		side: z.enum(['SIDE_A', 'SIDE_B']),
	}),
]);

const ParamsSchema = z.object({
	matchId: z.string(),
});

export const matchAction = makeAction(async ({ request, params }) => {
	try {
		const formData = await request.formData();

		const data = ActionSchema.parse(Object.fromEntries(formData));
		const { matchId } = ParamsSchema.parse(params);

		const response = await match(data)
			.with({ intent: 'ready' }, async ({ matchPlayerId }) => {
				return await api.match.ready.mutate({ matchPlayerId }, { signal: request.signal });
			})
			.with({ intent: 'leave' }, async ({ matchPlayerId }) => {
				return await api.match.leave
					.mutate({ matchPlayerId }, { signal: request.signal })
					.then(() => redirect('/'))
					.catch(error => error);
			})
			.with({ intent: 'start' }, async () => {
				return await api.match.start.mutate({ matchId }, { signal: request.signal });
			})
			.with({ intent: 'end' }, async () => {
				const response = await api.match.end.mutate({ matchId }, { signal: request.signal });
				if (response.success) {
					/** We mark the matches cache as stale. */
					await markAsStale({ cacheKey: ['match.list', CursorPaginationSchema.parse({})] });
					return redirect('/');
				}
				return response;
			})
			.with({ intent: 'update_score' }, async ({ score, side }) => {
				console.log('UPDATING SCORE');
				return await api.match.updateScore.mutate({ matchId, score, side }, { signal: request.signal });
			})
			.exhaustive();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!response) throw new Error('Invalid intent');

		return response;
	} catch (error) {
		console.error(error);
		if (isInstanceOf(MatchError)(error)) {
			return error;
		}
		throw error;
	}
});
