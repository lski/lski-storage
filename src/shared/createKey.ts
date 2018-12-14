let counter = 0;

export const createKey = (name: string, namespace: string | undefined) => {
	return `${namespace || `idx${++counter}`}_${name}`;
};