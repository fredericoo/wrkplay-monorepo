import type { CursorPaginationSchema } from '@wrkplay/core';
import { DEFAULT_PAGE_SIZE } from '@wrkplay/core';
import { match, P } from 'ts-pattern';
import type { z } from 'zod';

/** Gets parameters for prisma cursor-based pagination, from CursorPaginationSchema compatible schemas */
export const getCursorPagination = (input?: z.infer<typeof CursorPaginationSchema>) =>
	match(input)
		.with({ first: P.number, after: P.not(P.nullish) }, ({ first, after }) => ({
			take: first,
			skip: 1,
			cursor: { id: after },
		}))
		.with({ last: P.number, before: P.not(P.nullish) }, ({ last, before }) => ({
			take: -last,
			skip: 1,
			cursor: { id: before },
		}))
		.with({ first: P.number }, ({ first }) => ({ take: first }))
		.with({ last: P.number }, ({ last }) => ({ take: -last }))
		.otherwise(() => ({ take: DEFAULT_PAGE_SIZE }));
