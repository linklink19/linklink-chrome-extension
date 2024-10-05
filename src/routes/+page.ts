import type { PageLoad } from './$types';
import { pinned_extension_page } from '$lib/stores';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

export const load: PageLoad = ({ params }) => {
    let pinned_page = get(pinned_extension_page);
    console.log('???');
    if (pinned_page !== null) {
        console.log(pinned_page);
        goto(pinned_page);
        // window.location.href = pinned_page;
    }
	return {
	};
};