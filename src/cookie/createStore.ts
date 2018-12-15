import { createKey } from '../shared/createKey';
import { IStore, SetValue, CookieParams } from '../../index';

export function createStore<T>(name = '', params: CookieParams = { path: '/', domain: location.hostname }): IStore<T> {

	const key = encodeURIComponent(createKey(name));

	const data = () => {

		const rawCookie = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);

		if (!rawCookie) {
			return null;
		}

		const decoded = decodeURIComponent(rawCookie[ 2 ]);

		return extractValue<T>(decoded);
	};

	const get = () => {
		const all = data();
		return all === null ? null : all.value;
	};

	const set: SetValue<T> = (value, expiresAt) => {

		const cookiePairs = [
			`${key}=${createValue(value, expiresAt)}`
		];

		if (params.path) {
			cookiePairs.push('path=' + params.path);
		}

		if (params.domain) {
			cookiePairs.push('domain=' + params.domain);
		}

		if (expiresAt !== (void 0)) {

			const dat = typeof expiresAt === 'number'
				? new Date(expiresAt)
				: expiresAt;

			cookiePairs.push('expires=' + dat.toUTCString());
		}

		document.cookie = cookiePairs.join(';');

		return value;
	};

	const clear = () => {
		document.cookie = key + '=';
	};

	const has = () => !!data();

	return {
		data,
		get,
		set,
		clear,
		has
	};
}

/**
 * A value is a combination of valueAsJson;expiryTimeSinceEpoch. If there is no time, the semicolon separator is still added
 * @param value The raw value to store
 * @param expiresAt The optional number of milliseconds since epoch that this value will expire at
 */
const createValue = <T>(value: T, expiresAt: number | null | Date | undefined) => {

	if (value === (void 0) || value === null) {
		return ';';
	}

	return encodeURIComponent(JSON.stringify(value) + ';' + expiresAt || '');
};

const extractValue = <T>(raw: string) => {

	const idx = raw.lastIndexOf(';');

	const valueAsString = raw.substring(0, idx);
	const expiresAtString = raw.substring(idx + 1);

	// If value was an 'empty string' then it would have been stored as `""` as it would have gone through JSON.stringify first
	if (valueAsString.length === 0) {
		return null;
	}

	const value = JSON.parse(valueAsString) as T;
	const expiresAt = parseInt(expiresAtString, 10);

	return {
		value,
		expiresAt: isNaN(expiresAt) ? null : expiresAt
	};
};
