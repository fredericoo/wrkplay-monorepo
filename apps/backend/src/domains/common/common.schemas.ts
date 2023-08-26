import { z } from 'zod';

import { DEFAULT_PAGE_SIZE } from './common.constants';

export const CursorPaginationSchema = z.union([
	z.object({ after: z.string(), first: z.number().int().nonnegative().catch(DEFAULT_PAGE_SIZE) }),
	z.object({ before: z.string(), last: z.number().int().nonnegative().catch(DEFAULT_PAGE_SIZE) }),
]);
