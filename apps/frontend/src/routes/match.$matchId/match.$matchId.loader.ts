import { MatchError } from '@wrkplay/core';
import { makeLoader, redirect } from 'react-router-typesafe';
import { match } from 'ts-pattern';
import { z } from 'zod';

import { api } from '~/domains/api/api.client';
import { isInstanceOf } from '~/domains/common/common.utils';

const ParamsSchema = z.object({
	matchId: z.string(),
});

export const matchLoader = makeLoader(async ({ params }) => {
	const { matchId } = ParamsSchema.parse(params);

	try {
		const { match } = await api.match.getById.query({ matchId });
		return { match };
	} catch (error) {
		console.error(error);

		if (isInstanceOf(MatchError)(error)) {
			return match(error)
				.with({ code: 'NOT_FOUND' }, () => redirect('/'))
				.otherwise(() => {
					throw new Error('Unknown error');
				});
		}
		throw new Error('Unknown error');
	}
});
