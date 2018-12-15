let counter = 0;

export const createKey = (name: string | undefined) =>
	name || `_stored_idx${++counter}`;