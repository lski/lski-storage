
import { IStore, SetValue } from '../iStore';
import { createKey } from './createKey';

export interface IStored<T> {
	/**
	 * The time from epoch in secs where the value wont be returned after
	 */
	expiresAt: number | null;
	/**
	 * The actual value in storage
	 */
	value: T;
}

/**
 * Internal function that generates a store creator function, based on either localStorage or sessionStorage that will be used as the underlying store
 * @param internalStorage either the localStorage or sessionStorage object
 */
export const generateCreateStore = (internalStorage: Storage) => {

	return <T>(name: string, namespace = ''): IStore<T> => {

		const key = createKey(name, namespace);

		const set: SetValue<T> = (value, expiresAt) => {

			const stored: IStored<any> = {
				value,
				expiresAt: expiresAt === (void 0)
					? null
					: typeof expiresAt === 'number'
						? expiresAt
						: expiresAt.getTime()
			};

			internalStorage.setItem(key, JSON.stringify(stored));

			return value;
		};

		const get = () => {

			const raw = internalStorage.getItem(key);

			if (raw === null) {
				return null;
			}

			const stored = JSON.parse(raw) as IStored<T>;

			if (stored.expiresAt === null || stored.expiresAt > Date.now()) {
				return stored.value;
			}

			internalStorage.removeItem(key);
			return null;
		};

		const clear = () => {
			internalStorage.removeItem(key);
		};

		const has = () => !!get();

		return {
			get,
			set,
			clear,
			has
		};
	};
};
