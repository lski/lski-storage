export const createKey = (name: string, namespace: string | undefined) => {

	if (!namespace) {
		// Wouldnt normally use console here, but saves a lib
		/* tslint:disable */
		console && console.warn('It is strongly recommended that you include a namespace when creating a store to avoid collisons in underlying data stores');
		/* tslint:enable */
		return name;
	}

	return `${namespace}_${name}`;
};