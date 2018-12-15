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

	interface IStored<T> {
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
	 * A basic store, allowing a value to be set/get/cleared but with an optional expiry time
	 */
	interface IStore<T> {
		/**
		 * Sets a new value in storage (or overwrites an existing value with matching key).
		 *
		 * @param value The actual value to store
		 * @param expiresAt The point in time this value should expire, represented as the number of Milliseconds since Epoch or a Date object.
		 * @returns The original value passed in
		 */
		set: SetValue<T>;
		/**
		 * Gets the value if the expiry time has not elapsed, otherwise returns null.
		 */
		get(): T | null;
		/**
		 * Similar to get, except if a value exists then the expiresAt time is returned with the value. Otherwise returns null.
		 */
		data(): IStored<T> | null;
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