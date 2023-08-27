import { MatchError } from '@wrkplay/core';
import { makeAction } from 'react-router-typesafe';
import { match } from 'ts-pattern';
import { z } from 'zod';

import { api } from '~/domains/api/api.client';
import { isInstanceOf } from '~/domains/common/common.utils';

const ActionSchema = z.union([
	z.object({
		intent: z.literal('ready'),
		matchPlayerId: z.string(),
	}),
	z.object({
		intent: z.literal('start'),
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
				return await api.match.ready.mutate({ matchPlayerId });
			})
			.with({ intent: 'start' }, async () => {
				return await api.match.start.mutate({ matchId });
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
	}
});
