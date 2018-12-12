export type SetValue<T> = (value: T, expiresAt?: number | Date) => T;

export interface IStore<T> {
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