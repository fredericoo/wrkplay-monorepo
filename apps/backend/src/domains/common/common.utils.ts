import { match, P } from 'ts-pattern';
import type { z } from 'zod';

import { DEFAULT_PAGE_SIZE } from './common.constants';
import type { CursorPaginationSchema } from './common.schemas';

/** Gets parameters for prisma cursor-based pagination, from CursorPaginationSchema compatible schemas */
export const getCursorPagination = (input?: z.infer<typeof CursorPaginationSchema>) =>
	match(input)
		.with({ first: P.number }, ({ first, after }) => ({ take: first, cursor: { id: after } }))
		.with({ last: P.number }, ({ last, before }) => ({ take: last, cursor: { id: before } }))
		.otherwise(() => ({ take: DEFAULT_PAGE_SIZE }));
