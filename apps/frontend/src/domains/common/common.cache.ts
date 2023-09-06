import { del, get, set, update } from 'idb-keyval';
import { match } from 'ts-pattern';

type CacheData<T> = {
	updatedAt: number;
	data: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CacheOptions<TData = any> = {
	/** Time which the data is made stale and replaced in cache. */
	staleTimeMs: number;
	cacheKey: string | string[] | (string | object)[];
	fetchFn: (cacheKey: string) => Promise<TData>;
	onError: 'throw' | 'stale';
};

export const getFromCache = async <T>(
	cacheOptions: CacheOptions<T>,
): Promise<CacheData<T> & { status: 'fresh' | 'stale' | 'stale-error' }> => {
	const cacheKey = JSON.stringify(cacheOptions.cacheKey);
	const cachedData: CacheData<T> | undefined = await get(cacheKey);
	const isCacheValid = !cachedData || Date.now() - cachedData.updatedAt > cacheOptions.staleTimeMs;

	if (!isCacheValid)
		return {
			updatedAt: cachedData.updatedAt,
			data: cachedData.data,
			status: 'stale',
		};

	try {
		const data = await cacheOptions.fetchFn(cacheKey);
		const dataToCache: CacheData<T> = {
			updatedAt: Date.now(),
			data,
		};
		await set(cacheKey, dataToCache);

		return {
			updatedAt: dataToCache.updatedAt,
			data: dataToCache.data,
			status: 'fresh',
		};
	} catch (error) {
		return match(cacheOptions)
			.with({ onError: 'throw' }, () => {
				throw error;
			})
			.with({ onError: 'stale' }, () => {
				if (cachedData)
					return {
						updatedAt: cachedData.updatedAt,
						data: cachedData.data,
						status: 'stale-error' as const,
					};
				throw error;
			})
			.exhaustive();
	}
};

/** Clears cache for a given key. Prefer `markAsStale` to avoid clearing offline-available data. */
export const clearCache = async (params: { cacheKey: CacheOptions['cacheKey'] }) => {
	await del(JSON.stringify(params.cacheKey));
};

/** TODO: be able to mark a cache segment as stale */
export const markAsStale = async (params: { cacheKey: CacheOptions['cacheKey'] }) => {
	await update(JSON.stringify(params.cacheKey), cachedData => {
		if (!cachedData) return;

		return {
			...cachedData,
			updatedAt: 0,
		};
	});
};
