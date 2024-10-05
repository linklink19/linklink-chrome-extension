import type { PageLoad } from './$types';
import { pinned_extension_page } from '$lib/stores';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

export const load: PageLoad = ({  }) => {
    let pinned_page = get(pinned_extension_page);
    if (pinned_page !== null) {
        goto(pinned_page);
    }
	return {};
};