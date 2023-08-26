import type { RecordStatus } from '@prisma/client';
import { z } from 'zod';

import type { NonEmptyArray } from '../common/common.types';

/** Ensures if a new status is added we get a type error */
const recordStatusesObj = { ARCHIVED: true, DRAFT: true, PUBLISHED: true } as const satisfies Record<
	RecordStatus,
	true
>;

export const recordStatuses = Object.keys(recordStatusesObj) as NonEmptyArray<RecordStatus>;

export const RecordStatusSchema = z.enum(recordStatuses);
