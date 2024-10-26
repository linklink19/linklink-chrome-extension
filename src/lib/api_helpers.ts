import { current_tabs, user_lilis } from '$lib/stores';
import { type LiliOutput, LiliService, type Link, LinkService } from '$lib/api/openapi';
import { zero_uuid } from '$lib/uuid';
import { get } from 'svelte/store';

export let refresh_user_lilis = async () => {
    let new_user_lilis = await LiliService.liliGet({
        includePrivate: true,
        includeNonUserPublic: false,
        limit: 100
    });
    user_lilis.set(new_user_lilis);
    console.log('refreshed user lilis');
};

export async function add_link_to_lili(links: Link[], lili: LiliOutput) {
    try {
        let new_links = await LinkService.linkPost(
            {
                liliId: lili.id,
                requestBody: links,
            }
        );
        lili.links = [...new_links, ...lili.links]; // technically order is broken here.
        lili.n_links = lili.links.length;
        // on_update(); // TODO: implement this globally somehow
    } catch (e) {
        alert("Error saving link");
    }
}
export let add_all_tabs = async (lili: LiliOutput) => {
        async function add_all_tabs_to_lili() {
        let links = get(current_tabs).map((tab, idx) => {
                return {
                    id: zero_uuid,
                    lili_id: zero_uuid,
                    order_in_list: idx,
                    url: tab.url ?? '',
                    name: tab.title ?? '',
                    description: "",
                };
            });
        await add_link_to_lili(links, lili);
    }
}

function is_superset_array(array: Array<any>, subArray: Array<any>) {
  for (let elem of subArray) {
    if (!array.includes(elem)) {
      return false; // If any element is not found, array is not a superset
    }
  }
  return true; // All elements found, array is a superset
}
export let has_all_tabs = (lili: LiliOutput) => {
    let tab_urls = get(current_tabs).map((tab) => tab.url);
    let lili_urls = lili.links.map((link) => link.url);
    return is_superset_array(lili_urls, tab_urls);
}
