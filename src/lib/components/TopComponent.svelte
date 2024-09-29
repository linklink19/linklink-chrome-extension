<script lang="ts">
    import { get_current_tab } from '$lib/chrome_utils';
    import { onMount } from 'svelte';
    import { current_lili } from '$lib/stores';
    import { LinkService } from '$lib/api/openapi';
    import { zero_uuid } from '$lib/uuid';

    let tab: chrome.tabs.Tab | null = null;

    onMount(async () => {
        tab = await get_current_tab();
    });
    $: favicon_url = tab?.favIconUrl ?? 'https://blank.page/';


    // Check that the tab's url is not contained in the current lili
    $: tab_already_in_lili = $current_lili?.links.some((link) => link.url === tab?.url) === true
    const save_current_link = async () => {
        if (!tab) {
            return;
        }
        try {
            let new_links = await LinkService.linkPost(
                {
                    liliId: $current_lili.id,
                    requestBody: [
                        {
                            id: zero_uuid,
                            lili_id: $current_lili.id,
                            order_in_list: 0,
                            url: tab.url ?? '',
                            name: tab.title ?? '',
                            description: '',
                        }
                    ]
                }
            );
        } catch (e) {
            alert("Error saving link");
        }
    };
</script>

<div class="flex flex-col">
    <div class="flex h-12 w-full flex-grow items-center justify-between rounded variant-ghost">
        <button
            class="btn flex justify-center items-center h-full p-2 hover:bg-white hover:bg-opacity-5
            border-r-[1px] border-gray-500"
        >
            <span class="flex items-center justify-center">
                <i class="h-full w-8 fas fa-eye" />
            </span>
        </button>
        <span class="flex items-center justify-center gap-2">
                <img
                    class="h-5 w-5 select-none justify-self-start icon"
                    src={favicon_url}
                    alt=""
                />
                <span>{tab?.title}</span>
        </span>
        <button
            class="btn flex justify-center items-center h-full p-2 hover:bg-white hover:bg-opacity-5
            border-r-[1px] border-gray-500 gap-3 min-w-24 border-l-[1px]"
            on:click={save_current_link}
            disabled={tab_already_in_lili}
        >
            <span class="flex items-center justify-center gap-2">

                <span>
                    {tab_already_in_lili ? `Saved` : `Save`}
                </span>
            </span>
        </button>
    </div>
</div>
