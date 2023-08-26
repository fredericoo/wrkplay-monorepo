import { match, P } from 'ts-pattern';
import { ZodError } from 'zod';

/** Authorized error we can easily discern from internally. */
export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UnauthorizedError';
	}
}

/** Not found error we can easily discern from internally. */
export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFoundError';
	}
}

const errorMatcher = P.union(P.instanceOf(Error), { message: P.string });

/** Utility to get the error payload from an API call. */
export const getErrorPayload = (error: unknown) =>
	match(error)
		.with(P.instanceOf(ZodError), matchedError => matchedError.formErrors)
		.with(errorMatcher, matchedError => matchedError.message)
		/** Extend with more matchers if there's more error types to add. */
		.otherwise(() => 'Unknown error');

export const getErrorMessage = (error: unknown) =>
	match(error)
		.with(P.string, errorString => errorString)
		.with(P.instanceOf(ZodError), matchedError => matchedError.formErrors.formErrors.join(', '))
		.with(errorMatcher, matchedError => matchedError.message)
		.otherwise(() => 'Unknown error');

/** Utility to get status codes from error responses */
export const getErrorStatusCode = (error: unknown) =>
	match(error)
		/** Internal authorization error */
		.with(P.instanceOf(UnauthorizedError), () => 401 as const)
		/** Zod validation error */
		.with(P.instanceOf(ZodError), () => 400 as const)
		/** Prismic not found error */
		.with({ message: 'No documents were returned' }, () => 404 as const)
		/** Internal not found error */
		.with(P.instanceOf(NotFoundError), () => 404 as const)
		/** Extend with more matchers if there's more error types to add. */
		.otherwise(() => 500 as const);

export default function invariant(
	condition: any,
	// Can provide a string, or a function that returns a string for cases where
	// the message takes a fair amount of effort to compute
	message?: string,
): asserts condition {
	if (condition) {
		return;
	}

	throw new Error(message);
}
