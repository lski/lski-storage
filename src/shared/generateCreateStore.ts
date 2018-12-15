
import { createKey } from './createKey';
import { IStore, SetValue, IStored } from '../../index';

/**
 * Internal function that generates a store creator function, based on either localStorage or sessionStorage that will be used as the underlying store
 * @param internalStorage either the localStorage or sessionStorage object
 */
export const generateCreateStore = (internalStorage: Storage) => {

	return <T>(name = ''): IStore<T> => {

		const key = createKey(name);

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
			const all = data();
			return all === null ? null : all.value;
		};

		const data = () => {

			const raw = internalStorage.getItem(key);

			if (raw === null) {
				return null;
			}

			const stored = JSON.parse(raw) as IStored<T>;

			if (stored.expiresAt === null || stored.expiresAt > Date.now()) {
				return stored;
			}

			internalStorage.removeItem(key);
			return null;
		};

		const clear = () => {
			internalStorage.removeItem(key);
		};

		const has = () => !!get();

		return {
			data,
			get,
			set,
			clear,
			has
		};
	};
};
