import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { pinned_extension_page, user_lilis } from '$lib/stores';

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
	/**
     * @type {string | null}
     */
	let _id = null;
	try {
		_id = url.searchParams.get('id');
		let lili = get(user_lilis).find(lili => {
			return lili.id === _id;
		});
		return {lili: lili}
	} catch (e2){
		try {
			console.log('nth');
			console.log(e2);
			console.log('ntth');
		pinned_extension_page.set(null);

		goto('/');
		}
		catch (e){
			console.log(e)
		return {}
		}
	}
	return {
		id: _id,
	};
}