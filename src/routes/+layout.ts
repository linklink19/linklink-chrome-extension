import { get_current_tab } from '$lib/chrome_utils';
import { current_tab } from '$lib/stores';
// @ts-ignore
import type { PageLoad } from './$types';
//
// @ts-ignore
export const load: PageLoad = async ({url}) => {
    try {
        let tab = await get_current_tab();
        current_tab.set(tab);

    } catch (e) {
        console.error(e);
    };

    return {url: url.pathname};
};

export const prerender = true;
