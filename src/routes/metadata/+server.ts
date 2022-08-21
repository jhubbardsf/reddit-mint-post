import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({
	clientAddress,
	locals,
	params,
	platform,
	request,
	routeId,
	setHeaders,
	url
}) => {
	const foo = 'bar';

	return new Response(JSON.stringify({ foo }));
};
