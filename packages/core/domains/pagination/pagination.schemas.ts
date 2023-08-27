import { DEFAULT_PAGE_SIZE } from './pagination.constants';
import z from 'zod';

export const CursorPaginationSchema = z
	.union([
		z.object({ after: z.string().optional(), before: z.undefined().optional(), first: z.number().int().nonnegative() }),
		z.object({ before: z.string().optional(), after: z.undefined().optional(), last: z.number().int().nonnegative() }),
	])
	.catch({ first: DEFAULT_PAGE_SIZE });
