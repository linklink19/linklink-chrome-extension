import type { PageLoad } from './$types';
import { pinned_extension_page } from '$lib/stores';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({  }) => {
    let pinned_page = get(pinned_extension_page);
    // pinned_page = null;
    if (pinned_page !== null) {
        // redirect(307, '/index.html' + pinned_page)
        goto(pinned_page);
    }
	return {};
}