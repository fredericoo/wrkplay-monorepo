import { DEFAULT_PAGE_SIZE } from './pagination.constants';
import z from 'zod';

const EntryCountSchema = z.coerce.number().int().nonnegative();

export const CursorPaginationSchema = z
	.union([
		z.object({ first: EntryCountSchema }),
		z.object({ after: z.string().optional(), first: EntryCountSchema }),
		z.object({ before: z.string().optional(), last: EntryCountSchema }),
	])
	.catch({ first: DEFAULT_PAGE_SIZE });
