type ErrorCode =
	| 'INVALID_TAG'
	| 'NOT_FOUND'
	| 'NOT_STARTED'
	| 'ALREADY_STARTED'
	| 'ALREADY_FINISHED'
	| 'SIDE_FULL'
	| 'NOT_READY'
	| 'NOT_IN_MATCH'
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
