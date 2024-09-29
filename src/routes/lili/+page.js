/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
	let id = null;
	try {
		id = url.searchParams.get('id');
	} catch {
	};
	return {
		id: id,
	};
}