import { makeAction } from 'react-router-typesafe';

import { markAsStale } from '~/domains/common/common.cache';

export const indexAction = makeAction(async () => {
	await markAsStale({ cacheKey: ['match', 'list'] });
	return { ok: true };
});
