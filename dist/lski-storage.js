'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let counter = 0;
const createKey = (name, namespace) => {
    return `${namespace || `idx${++counter}`}_${name}`;
};

/**
 * Internal function that generates a store creator function, based on either localStorage or sessionStorage that will be used as the underlying store
 * @param internalStorage either the localStorage or sessionStorage object
 */
const generateCreateStore = (internalStorage) => {
    return (name, namespace = '') => {
        const key = createKey(name, namespace);
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
            const raw = internalStorage.getItem(key);
            if (raw === null) {
                return null;
            }
            const stored = JSON.parse(raw);
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

const createStore = generateCreateStore(localStorage);

function createStore$1(name, namespace = '', params = { path: '/', domain: location.hostname }) {
    const key = encodeURIComponent(createKey(name, namespace));
    // We allow null here so that we can clear a cookie by setting it to a null value.
    // We dont want to expose that though.
    const set = (value, expiresAt) => {
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
        const decoded = decodeURIComponent(rawCookie[2]);
        // If nothing was stored, even a blank string would be "" via JSON.strinify for instance, then leave
        // TODO: Investigate checking this via the expiry date as when setting it to nothing it resets the expiry time
        // Not sure if that works tho as a quick check didnt show an expired cookie coming back with an expiry set
        if (decoded.length === 0) {
            return null;
        }
        return JSON.parse(decoded);
    };
    const clear = () => {
        set(null);
    };
    const has = () => !!get();
    return {
        get,
        set: set,
        clear,
        has
    };
}
const createValue = (value) => {
    if (value === (void 0) || value === null) {
        return '';
    }
    return encodeURIComponent(JSON.stringify(value));
};

/**
 * Creates a new store with the underlying mechanism being sessionStorage
 */
const createStore$2 = generateCreateStore(sessionStorage);

/**
 * Converts a relative no of milliseconds from now, to a relative no of ms from Epoch
 */
const expiresInMs = (expiresIn) => {
    return Date.now() + expiresIn;
};
/**
 * Converts a relative no of seconds from now, to a relative no of ms from Epoch. Alias of expiresIn
 */
const expiresInSecs = (expiresIn) => {
    return expiresInMs(expiresIn * 1000);
};

exports.local = createStore;
exports.cookie = createStore$1;
exports.session = createStore$2;
exports.expiresIn = expiresInSecs;
