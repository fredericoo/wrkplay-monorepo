import { openDB } from 'idb';

const CACHE_NAME = 'data_cache';

export type ObjectWithCacheKeys = {
	cacheKey1: string;
	cacheKey2: IDBValidKey;
	cacheKey3: IDBValidKey;
	cacheKey4: IDBValidKey;
	cacheKey5: IDBValidKey;
};

/** Returns an object with `cacheKey${1 | 2 | 3 | 4 | 5}` and their respective cache positions, in the key array.
 * If not present, fills them with empty strings.
 */
const getCacheKeysObj = (key: IDBValidKey): ObjectWithCacheKeys => {
	if (!Array.isArray(key)) throw new Error('Cache key must be an array of strings or numbers');
	if (!(typeof key[0] === 'string')) throw new Error('First cache key must be a string');
	return {
		cacheKey1: key[0] ?? '',
		cacheKey2: key[1] ?? '',
		cacheKey3: key[2] ?? '',
		cacheKey4: key[3] ?? '',
		cacheKey5: key[4] ?? '',
	};
};

export const dbPromise = openDB('workplay_idb', 1, {
	upgrade(db, _oldVersion, _newVersion, _transaction, _event) {
		db.createObjectStore(CACHE_NAME, {
			keyPath: ['cacheKey1', 'cacheKey2', 'cacheKey3', 'cacheKey4', 'cacheKey5'],
		});
	},
	blocked(_currentVersion, _blockedVersion, _event) {
		// …
	},
	blocking(_currentVersion, _blockedVersion, _event) {
		// …
	},
	terminated() {
		// …
	},
});

export const createObjectStoreMethods = <DataSchema extends object>(storeName: string) => ({
	async get(key: IDBValidKey[]) {
		/** We fill the key array with empty strings until it has length 5 */
		const cacheKey = key.concat(Array(5 - key.length).fill(''));
		return await (await dbPromise).get(storeName, cacheKey);
	},
	async getAll(key: IDBValidKey) {
		return await (await dbPromise).getAll(storeName, IDBKeyRange.lowerBound(key));
	},
	async set(key: IDBValidKey, val: DataSchema) {
		if (!Array.isArray(key)) throw new Error('Cache key must be an array of strings or numbers');
		if (!(typeof key[0] === 'string')) throw new Error('First cache key must be a string');

		const cacheKeys = getCacheKeysObj(key);
		Object.assign(val, cacheKeys);

		return (await dbPromise).put(storeName, val);
	},
	async update(key: IDBValidKey, updateFn: (prev: Partial<DataSchema>) => Partial<DataSchema>) {
		const db = await dbPromise;

		const matchesKeys = await db.getAllKeys(storeName, IDBKeyRange.lowerBound(key));

		for (const key of matchesKeys) {
			const value = await db.get(storeName, key);
			const updatedValue = updateFn(value);
			await db.put(storeName, updatedValue);
		}
	},
	async del(key: IDBValidKey[]) {
		return (await dbPromise).delete(storeName, IDBKeyRange.lowerBound(key));
	},
	async clear() {
		return (await dbPromise).clear(storeName);
	},
	async keys() {
		return (await dbPromise).getAllKeys(storeName);
	},
});

export const idbDataCache = createObjectStoreMethods(CACHE_NAME);
