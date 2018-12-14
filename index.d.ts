declare namespace lski.storage {

	/**
	 * Creating a localStorage based store
	 */
	const local: <T>(name: string, namespace?: string) => IStore<T>;

	/**
	 * Create a sessionStorage based store
	 */
	const session: <T>(name: string, namespace?: string) => IStore<T>;

	/**
	 * Create a cookie based store
	 */
	const cookie: <T>(name: string, namespace?: string, params?: CookieParams) => IStore<T>;


	interface CookieParams {
		domain?: string;
		path?: string;
	}

	type SetValue<T> = (value: T, expiresAt?: number | Date) => T;

	/**
	 * A basic store interface
	 */
	interface IStore<T> {
		/**
		 * Sets a new value in storage (or overwrites an existing value with matching key).
		 *
		 * @param value The actual value to store
		 * @param expiresAt The point in time this value should expire, represented as the number of Milliseconds since Epoch or a Date object.
		 * Use {@see expiresIn()} for convenience of passing in relative values from now, rather than Epoch.
		 * @returns The value passed in
		 */
		set: SetValue<T>;
		/**
		 * Gets the value if the expiry time has not elapsed, otherwise returns null.
		 */
		get(): T | null;
		/**
		 * Clears a value out of storage so it cant be used again
		 */
		clear(): void;
		/**
		 * Detects whether a value still exists
		 */
		has(): boolean;
	}
}

// tslint:disable-next-line:export-just-namespace
export = lski.storage;