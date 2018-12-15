import { generateCreateStore } from '../shared/generateCreateStore';

/**
 * Creates a new store with the underlying mechanism being sessionStorage
 */
export const createStore = generateCreateStore(sessionStorage);
