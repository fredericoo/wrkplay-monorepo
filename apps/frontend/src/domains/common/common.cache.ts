import { del, get, set, update } from 'idb-keyval';

export type CacheData<T> = {
	updatedAt: number;
	data: T;
};

type CacheStatus = 'fresh' | 'stale' | 'stale-error';

export type CacheDataWithStatus<T> = CacheData<T> & {
	status: CacheStatus;
};

type CacheKeyInput = string | string[] | (string | object)[];

export type ErrorBehaviour = 'throw' | 'ignore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CacheOptions<TData = any, TError extends ErrorBehaviour = 'throw' | 'ignore'> = {
	/** Time which the data is made stale and replaced in cache. */
	staleTimeMs: number;
	cacheKey: CacheKeyInput;
	fetchFn: (cacheKey: CacheKeyInput) => Promise<TData>;
	onError: TError;
};

const getIDBCacheKey = (input: CacheKeyInput): string => JSON.stringify(input);

/** Gets data from cache given a key, if there’s data. */
export const getFromCache = async <T>(
	cacheOptions: Pick<CacheOptions<T>, 'cacheKey' | 'staleTimeMs'>,
): Promise<CacheDataWithStatus<T> | undefined> => {
	const cacheKey = getIDBCacheKey(cacheOptions.cacheKey);
	const cachedData: CacheData<T> | undefined = await get(cacheKey);
	if (!cachedData) return undefined;

	const isCacheValid = Date.now() - cachedData.updatedAt > cacheOptions.staleTimeMs;
	return { data: cachedData.data, updatedAt: cachedData.updatedAt, status: isCacheValid ? 'fresh' : 'stale' };
};

export type HandledData<E extends ErrorBehaviour, T> = E extends 'ignore' ? T | undefined : T;

export const fetchAndCache = async <T, E extends ErrorBehaviour>(
	cacheOptions: CacheOptions<T, E>,
): Promise<HandledData<E, CacheDataWithStatus<T>>> => {
	const cacheKey = getIDBCacheKey(cacheOptions.cacheKey);
	try {
		const data = await cacheOptions.fetchFn(cacheOptions.cacheKey);
		const dataToCache: CacheData<T> = {
			updatedAt: Date.now(),
			data,
		};
		await set(cacheKey, dataToCache);
		return { data: dataToCache.data, updatedAt: dataToCache.updatedAt, status: 'fresh' };
	} catch (error) {
		if (cacheOptions.onError === 'ignore') return undefined as any;
		throw error;
	}
};

export type SWR<T, E extends ErrorBehaviour> = {
	cached: CacheDataWithStatus<T> | undefined;
	fresh: Promise<HandledData<E, CacheDataWithStatus<T>>>;
	_onError: E;
};

export const swr = async <T, E extends ErrorBehaviour>(cacheOptions: CacheOptions<T, E>): Promise<SWR<T, E>> => ({
	cached: await getFromCache(cacheOptions),
	fresh: getFromCacheOrFetch(cacheOptions),
	_onError: cacheOptions.onError,
});

export const getFromCacheOrFetch = async <T>(
	cacheOptions: CacheOptions<T>,
): Promise<CacheData<T> & { status: 'fresh' | 'stale' | 'stale-error' }> => {
	const cacheKey = getIDBCacheKey(cacheOptions.cacheKey);
	const cachedData: CacheData<T> | undefined = await get(cacheKey);
	const isCacheValid = !cachedData || Date.now() - cachedData.updatedAt > cacheOptions.staleTimeMs;

	if (!isCacheValid)
		return {
			updatedAt: cachedData.updatedAt,
			data: cachedData.data,
			status: 'stale',
		};

	try {
		await new Promise(resolve => setTimeout(resolve, 2000));
		const data = await cacheOptions.fetchFn(cacheOptions.cacheKey);
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
		if (cacheOptions.onError === 'ignore') {
			if (cachedData)
				return {
					updatedAt: cachedData.updatedAt,
					data: cachedData.data,
					status: 'stale-error' as const,
				};
		}
		throw error;
	}
};

/** Clears cache for a given key. Prefer `markAsStale` to avoid clearing offline-available data. */
export const clearCache = async (params: { cacheKey: CacheOptions['cacheKey'] }) => {
	await del(getIDBCacheKey(params.cacheKey));
};

/** TODO: be able to mark a cache segment as stale */
export const markAsStale = async (params: { cacheKey: CacheOptions['cacheKey'] }) => {
	await update(getIDBCacheKey(params.cacheKey), cachedData => {
		if (!cachedData) return;

		return {
			...cachedData,
			updatedAt: 0,
		};
	});
};
