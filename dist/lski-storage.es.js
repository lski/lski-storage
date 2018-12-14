var createKey = function createKey(name, namespace) {
  if (!namespace) {
    // Wouldnt normally use console here, but saves a lib

    /* tslint:disable */
    console && console.warn('It is strongly recommended that you include a namespace when creating a store to avoid collisons in underlying data stores');
    /* tslint:enable */

    return name;
  }

  return "".concat(namespace, "_").concat(name);
};

/**
 * Internal function that generates a store creator function, based on either localStorage or sessionStorage that will be used as the underlying store
 * @param internalStorage either the localStorage or sessionStorage object
 */
var generateCreateStore = function generateCreateStore(internalStorage) {
  return function (name) {
    var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var key = createKey(name, namespace);

    var set = function set(value, expiresAt) {
      var stored = {
        value: value,
        expiresAt: expiresAt === void 0 ? null : typeof expiresAt === 'number' ? expiresAt : expiresAt.getTime()
      };
      internalStorage.setItem(key, JSON.stringify(stored));
      return value;
    };

    var get = function get() {
      var raw = internalStorage.getItem(key);

      if (raw === null) {
        return null;
      }

      var stored = JSON.parse(raw);

      if (stored.expiresAt === null || stored.expiresAt > Date.now()) {
        return stored.value;
      }

      internalStorage.removeItem(key);
      return null;
    };

    var clear = function clear() {
      internalStorage.removeItem(key);
    };

    var has = function has() {
      return !!get();
    };

    return {
      get: get,
      set: set,
      clear: clear,
      has: has
    };
  };
};

var createStore = generateCreateStore(localStorage);

function createStore$1(name) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    path: '/',
    domain: location.hostname
  };
  var key = encodeURIComponent(createKey(name, namespace)); // We allow null here so that we can clear a cookie by setting it to a null value.
  // We dont want to expose that though.

  var set = function set(value, expiresAt) {
    var cookiePairs = ["".concat(key, "=").concat(createValue(value))];

    if (params.path) {
      cookiePairs.push('path=' + params.path);
    }

    if (params.domain) {
      cookiePairs.push('domain=' + params.domain);
    }

    if (expiresAt !== void 0) {
      var dat = typeof expiresAt === 'number' ? new Date(expiresAt) : expiresAt;
      cookiePairs.push('expires=' + dat.toUTCString());
    }

    document.cookie = cookiePairs.join(';');
    return value;
  };

  var get = function get() {
    var rawCookie = document.cookie.match("(^|;) ?".concat(key, "=([^;]*)(;|$)"));

    if (!rawCookie) {
      return null;
    }

    var decoded = decodeURIComponent(rawCookie[2]); // If nothing was stored, even a blank string would be "" via JSON.strinify for instance, then leave
    // TODO: Investigate checking this via the expiry date as when setting it to nothing it resets the expiry time
    // Not sure if that works tho as a quick check didnt show an expired cookie coming back with an expiry set

    if (decoded.length === 0) {
      return null;
    }

    return JSON.parse(decoded);
  };

  var clear = function clear() {
    set(null);
  };

  var has = function has() {
    return !!get();
  };

  return {
    get: get,
    set: set,
    clear: clear,
    has: has
  };
}

var createValue = function createValue(value) {
  if (value === void 0 || value === null) {
    return '';
  }

  return encodeURIComponent(JSON.stringify(value));
};

var createStore$2 = generateCreateStore(sessionStorage);

/**
 * Converts a relative no of milliseconds from now, to a relative no of ms from Epoch
 */
var expiresInMs = function expiresInMs(expiresIn) {
  return Date.now() + expiresIn;
};
/**
 * Converts a relative no of seconds from now, to a relative no of ms from Epoch. Alias of expiresIn
 */

var expiresInSecs = function expiresInSecs(expiresIn) {
  return expiresInMs(expiresIn * 1000);
};

export { createStore as local, createStore$1 as cookie, createStore$2 as session, expiresInSecs as expiresIn };
