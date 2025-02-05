import { kitQLServer } from '$graphql/kitQLServer';
import type { RequestEvent } from '@sveltejs/kit';

export async function get() {
	return {
		status: 302,
		headers: { Location: '/' }
	};
}

export async function post(event: RequestEvent) {
	return kitQLServer.handleRequest(event.request);
}
