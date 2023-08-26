import { match, P } from 'ts-pattern';
import { ZodError } from 'zod';

const errorMatcher = P.union(P.instanceOf(Error), { message: P.string });

export const getErrorCode = (error: unknown) =>
	match(error)
		.with({ code: P.string }, matchedError => matchedError.code)
		.otherwise(() => 'UNKNOWN_ERROR');

export const getErrorMessage = (error: unknown) =>
	match(error)
		.with(P.string, errorString => errorString)
		.with(P.instanceOf(ZodError), matchedError => matchedError.formErrors.formErrors.join(', '))
		.with(errorMatcher, matchedError => matchedError.message)
		.otherwise(() => 'Unknown error');

export default function invariant(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	condition: any,
	message?: string,
): asserts condition {
	if (condition) {
		return;
	}
	throw new Error(message);
}
