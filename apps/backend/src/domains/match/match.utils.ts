import { MatchError } from '@wrkplay/core';

import { db } from '../db/db.client';

export const findPendingMatch = async (params: { pitchId: string }) => {
	const pendingMatch = await db.match
		.findFirst({
			where: { pitchId: params.pitchId, status: { not: 'FINISHED' } },
			select: {
				updatedAt: true,
				id: true,
				status: true,
				players: {
					select: {
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
				pitch: { select: { maxTeamSize: true, minTeamSize: true } },
			},
		})
		.catch(error => {
			console.error(error);
			throw new MatchError({ code: 'NOT_FOUND' });
		});

	if (!pendingMatch) return undefined;

	// TODO: bring back when figured out how to handle expired matches

	// const hasPendingMatchExpired = Date.now() - pendingMatch.updatedAt.getTime() > NON_STARTED_MATCH_EXPIRATION_TIME_MS;
	// if (hasPendingMatchExpired) {
	// 	console.log('deleting', pendingMatch.id);
	// 	await db.match.delete({ where: { id: pendingMatch.id } });
	// 	return undefined;
	// }

	return pendingMatch;
};
