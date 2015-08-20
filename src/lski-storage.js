/*! Lski-StorageJs - 0.6.0 */
/*jslint browser: true, white: true */
/*global define, window */

(function (factory) {

	"use strict";

	if (typeof define === 'function' && define.amd) {
		define(['root'], factory);
	}
	else {
		(window.lski || (window.lski = {})).storage = factory(window);
	}

})(function (root) {

	"use strict";

	var storage;

	// if localStorage isnt support attempt to do an in memory store, probably have to be in cookies to persistant
	// TODO: implement the fallback
	if (!root.localStorage || !root.localStorage.getItem) {
		storage = {
			getItem: function(key) {
				return storage.data[key] || null;
			},
			setItem: function() {
				storage.data[key] = value;
			},
			removeItem: function(key) {
				delete storage.data[key];
			},
			data: {}
		};
	}
	else {
		storage = localStorage;
	}

	var prefix = root.location.host + '.',
        store = function(key, value, options) {

            key = prefix + key;

            // get
            if (arguments.length === 1) {

                var raw = storage.getItem(key);

                if (raw === null) {
                    return null;
                }

                var val = JSON.parse(raw);

                if (!val.expires) {
                    return val.data;
                }

                var now = Date.now();

                if (val.expires <= now) {
                    storage.removeItem(key);
                    return null;
                }

                return val.data;
            }
            // set
            else if (arguments.length > 1) {

                if (value == null) {
                    storage.removeItem(key);
                }
                else {

                    var item = {
                        data: value
                    };

                    if (options && options.expires && !isNaN(options.expires)) {
                        item.expires = (options.expires * 1000) + Date.now();
                    }

                    storage.setItem(key, JSON.stringify(item));
                }
            }

            return null;
        };

	// Enter code to run here
	return {
		store: store
	};
});
