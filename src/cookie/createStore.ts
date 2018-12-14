import { createKey } from '../shared/createKey';
import { IStore, SetValue } from '../types';

interface CookieParams {
	domain?: string;
	path?: string;
}

export function createStore<T>(name: string, namespace = '', params: CookieParams = { path: '/', domain: location.hostname }): IStore<T> {

	const key = encodeURIComponent(createKey(name, namespace));

	// We allow null here so that we can clear a cookie by setting it to a null value.
	// We dont want to expose that though.
	const set: SetValue<T | null> = (value, expiresAt) => {

		const cookiePairs = [
			`${key}=${createValue(value)}`
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

	const get = () => {

		const rawCookie = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);

		if (!rawCookie) {
			return null;
		}

		const decoded = decodeURIComponent(rawCookie[ 2 ]);

		// If nothing was stored, even a blank string would be "" via JSON.strinify for instance, then leave
		// TODO: Investigate checking this via the expiry date as when setting it to nothing it resets the expiry time
		// Not sure if that works tho as a quick check didnt show an expired cookie coming back with an expiry set
		if (decoded.length === 0) {
			return null;
		}

		return JSON.parse(decoded) as T;
	};

	const clear = () => {
		set(null);
	};

	const has = () => !!get();

	return {
		get,
		set: set as SetValue<T>,
		clear,
		has
	};
}

const createValue = <T>(value: T | null) => {

	if (value === (void 0) || value === null) {
		return '';
	}

	return encodeURIComponent(JSON.stringify(value));
};
