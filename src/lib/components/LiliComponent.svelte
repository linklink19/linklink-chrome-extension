<script lang="ts">
    import { current_tab, current_tabs, pinned_lili_ids } from '$lib/stores';
    import { type LiliOutput, type Link, LinkService } from '$lib/api/openapi';
    import { WEBSITE_URL } from '$lib/constants';
    import { zero_uuid } from '$lib/uuid';
    import Tooltip from 'sv-tooltip';

    export let lili: LiliOutput;
    export let on_update = () => {};


    let is_already_added = (lili: LiliOutput) => {
        return lili.links.some((link) => link.url === $current_tab?.url) === true;
    }

    function is_superset_array(array, subArray) {
      for (let elem of subArray) {
        if (!array.includes(elem)) {
          return false; // If any element is not found, array is not a superset
        }
      }
      return true; // All elements found, array is a superset
    }

    let has_all_tabs = (lili: LiliOutput) => {
        let tab_urls = $current_tabs.map((tab) => tab.url);
        let lili_urls = lili.links.map((link) => link.url);
        return is_superset_array(lili_urls, tab_urls);
    }

    async function add_link_to_lili(links: Link[]) {
        try {
            let new_links = await LinkService.linkPost(
                {
                    liliId: lili.id,
                    requestBody: links,
                }
            );
            lili.links = [...new_links, ...lili.links]; // technically order is broken here.
            lili.n_links = lili.links.length;
            on_update();
        } catch (e) {
            alert("Error saving link");
        }
    }
    async function add_single_tab_to_lili() {
        await add_link_to_lili([
            {
                id: zero_uuid,
                lili_id: lili.id,
                order_in_list: 0,
                url: $current_tab?.url ?? '',
                name: $current_tab?.title ?? '',
                description: '',
            }
        ]);
    }
    async function add_all_tabs_to_lili() {
        let links = $current_tabs.map((tab, idx) => {
                return {
                    id: zero_uuid,
                    lili_id: zero_uuid,
                    order_in_list: idx,
                    url: tab.url ?? '',
                    name: tab.title ?? '',
                    description: "",
                };
            });
        await add_link_to_lili(links);
    }
    $: pinned = $pinned_lili_ids.includes(lili.id);
    let toggle_pin = async () => {
        if (pinned) {
            $pinned_lili_ids = $pinned_lili_ids.filter((id) => id !== lili.id);
            on_update();
        } else {
            $pinned_lili_ids = [...$pinned_lili_ids, lili.id];
            on_update();
        }
    }
</script>

<div class="flex max-h-14 min-h-14 rounded justify-between w-full h-full border border-gray-500 group">
    <button class="sqbtn-right hover:text-lg px-2 group/nested rounded-l" on:click={toggle_pin}>
        <i class={`fas fa-thumbtack ${!pinned ? 'group-hover/nested:text-white' : ''}`}
            class:-rotate-45={!pinned}
            class:text-gray-400={!pinned}
            class:text-[#08FAF5]={pinned}
        />
    </button>
    <a class="flex flex-col w-full backdrop-blur-xl truncate h-full p-2 pt-1"
        href={`/lili/?id=${lili.id}`}
    >
        <h1 class="text-base h-6 text-white group-hover:underline">{lili.name}</h1>
        <span class="text-xs h-4 flex truncate">
            {#if lili.public_access}
                <i class="fas fa-globe translate-y-0.5 pr-1.5 italic"/>
            {:else}
                <i class="fas fa-lock translate-y-0.5 pr-1.5 italic"/>
            {/if}
            <i class="fas fa-link translate-y-0.5 pr-0.5"/>
            {lili.n_links} {lili.description !== '' ? `-` : ``} {lili.description}
        </span>
    </a>

    <div class="flex min-h-full">
        <button on:click={() => {
            chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili.id}` });
        }} class="fas fa-up-right-from-square sqbtn-left text-lg"> </button>
        {#if has_all_tabs(lili)}
            <Tooltip tip="Already added tabs" left>
            <div class="flex items-center justify-center align-center sqbtn-left text-green-500 text-xl" disabled>
                <i class="fa-regular fa-circle-check"></i>
            </div>
            </Tooltip>
        {:else}
            <Tooltip tip="Add all tabs" left>
                <button class="
                    hover:variant-ghost-success min-h-full border-l-[1px]
                    border-gray-500 w-12 text-xl text-[#7DE95E] rounded-r
                    relative
                "
                    on:click={add_all_tabs_to_lili}
                >
                    <i class="fas fa-angles-down "></i>
                </button>
            </Tooltip>
        {/if}

        {#if is_already_added(lili)}
            <Tooltip tip="Already added" left>
            <div class="flex items-center justify-center align-center sqbtn-left text-green-500 text-xl" disabled>
                <i class="fa-regular fa-circle-check"></i>
            </div>
            </Tooltip>
        {:else}
            <Tooltip tip="Add current tab" left>
                <button class="
                    hover:variant-ghost-success min-h-full border-l-[1px]
                    border-gray-500 w-12 text-xl text-[#7DE95E] rounded-r
                "
                    on:click={add_single_tab_to_lili}
                >
                    <i class="fas fa-angle-down "></i>
                </button>
            </Tooltip>
        {/if}
    </div>
</div>


<style>
    .sqbtn {
        @apply hover:variant-ghost w-12 min-h-full border-gray-500;
    }

    .sqbtn-left {
        @apply sqbtn border-l-[1px];
    }

    .sqbtn-right {
        @apply sqbtn border-r-[1px];
    }
</style>