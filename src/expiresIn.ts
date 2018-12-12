/**
 * Converts a relative no of milliseconds from now, to a relative no of ms from Epoch
 */
export const expiresInMs = (expiresIn: number) => {
	return Date.now() + expiresIn;
};

/**
 * Converts a relative no of seconds from now, to a relative no of ms from Epoch. Alias of expiresIn
 */
export const expiresInSecs = (expiresIn: number) => {
	return expiresInMs(expiresIn * 1000);
};

/**
 * Converts a relative no of minutes from now, to a relative no of ms from Epoch
 */
export const expiresInMins = (expiresIn: number) => {
	return expiresInMs(expiresIn * 60000);
};

/**
 * Converts a relative no of hours from now, to a relative no of ms from Epoch
 */
export const expiresInHrs = (expiresIn: number) => {
	return expiresInMs(expiresIn * 3600000);
};

/**
 * Converts a relative no of days from now, to a relative no of ms from Epoch
 */
export const expiresInDays = (expiresIn: number) => {
	return expiresInMs(expiresIn * 86400000);
};

/**
 * Converts a relative no of seconds from now, to a relative no of ms from Epoch
 */
export const expiresIn = expiresInSecs;
