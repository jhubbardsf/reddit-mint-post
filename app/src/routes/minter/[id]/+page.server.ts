import type { PageServerLoad, Action } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		params
	};
};
