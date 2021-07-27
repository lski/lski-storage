'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let counter = 0;
const createKey = (name) => name || `_stored_idx${++counter}`;

/**
 * Internal function that generates a store creator function, based on either localStorage or sessionStorage that will be used as the underlying store
 * @param internalStorage either the localStorage or sessionStorage object
 */
const generateCreateStore = (internalStorage) => {
    return (name = '') => {
        const key = createKey(name);
        const set = (value, expiresAt) => {
            const stored = {
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
            const stored = JSON.parse(raw);
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

const createStore = generateCreateStore(localStorage);

function createStore$1(name = '', params = { path: '/', domain: location.hostname }) {
    const key = encodeURIComponent(createKey(name));
    const data = () => {
        const rawCookie = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
        if (!rawCookie) {
            return null;
        }
        const decoded = decodeURIComponent(rawCookie[2]);
        return extractValue(decoded);
    };
    const get = () => {
        const all = data();
        return all === null ? null : all.value;
    };
    const set = (value, expiresAt) => {
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
const createValue = (value, expiresAt) => {
    if (value === (void 0) || value === null) {
        return ';';
    }
    return encodeURIComponent(JSON.stringify(value) + ';' + expiresAt || '');
};
const extractValue = (raw) => {
    const idx = raw.lastIndexOf(';');
    const valueAsString = raw.substring(0, idx);
    const expiresAtString = raw.substring(idx + 1);
    // If value was an 'empty string' then it would have been stored as `""` as it would have gone through JSON.stringify first
    if (valueAsString.length === 0) {
        return null;
    }
    const value = JSON.parse(valueAsString);
    const expiresAt = parseInt(expiresAtString, 10);
    return {
        value,
        expiresAt: isNaN(expiresAt) ? null : expiresAt
    };
};

/**
 * Creates a new store with the underlying mechanism being sessionStorage
 */
const createStore$2 = generateCreateStore(sessionStorage);

exports.local = createStore;
exports.cookie = createStore$1;
exports.session = createStore$2;
