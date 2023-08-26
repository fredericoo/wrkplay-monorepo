import type { User } from '@prisma/client';

import { db } from '../db/db.client';
import { NON_STARTED_MATCH_EXPIRATION_TIME_MS } from './match.constants';

type ErrorCode =
	| 'NOT_FOUND'
	| 'NOT_STARTED'
	| 'ALREADY_STARTED'
	| 'SIDE_FULL'
	| 'NOT_JOINED'
	| 'ALREADY_JOINED'
	| 'ONGOING_MATCH'
	| 'TEAM_SIZE_MISMATCH';

export class MatchError extends Error {
	public code: ErrorCode;

	constructor(params: { message?: string; code: ErrorCode }) {
		super(params.message ?? params.code);
		this.name = 'MatchError';
		this.code = params.code;
	}
}

export const findPendingMatch = async (params: { pitchId: string }) => {
	const pendingMatch = await db.match
		.findFirst({
			where: { pitchId: params.pitchId, status: { not: 'FINISHED' } },
			select: {
				updatedAt: true,
				id: true,
				status: true,
				sideA: { select: { id: true } },
				sideB: { select: { id: true } },
				pitch: { select: { maxTeamSize: true, minTeamSize: true } },
			},
		})
		.catch(error => {
			console.error(error);
			throw new MatchError({ code: 'NOT_FOUND' });
		});

	if (!pendingMatch) return undefined;

	const hasPendingMatchExpired = Date.now() - pendingMatch.updatedAt.getTime() > NON_STARTED_MATCH_EXPIRATION_TIME_MS;
	if (hasPendingMatchExpired) {
		await db.match.delete({ where: { id: pendingMatch.id } });
		return undefined;
	}

	return pendingMatch;
};

export const isUserInMatch = (params: {
	user: Pick<User, 'id'>;
	match: { sideA: Pick<User, 'id'>[]; sideB: Pick<User, 'id'>[] };
}) =>
	params.match.sideA.some(sideUser => sideUser.id === params.user.id) ||
	params.match.sideB.some(sideUser => sideUser.id === params.user.id);
