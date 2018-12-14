import { IStore } from './src/types';

declare namespace lskiStorage {

	const local: CreateStore;

	const session:  CreateStore;

	const cookie: CreateCookieStore;
}

export = lskiStorage;

interface CookieParams {
	domain?: string;
	path?: string;
}

declare type CreateCookieStore = <T>(name: string, namespace?: string, params?: CookieParams) => IStore<T>;

declare type CreateStore = <T>(name: string, namespace?: string) => IStore<T>;