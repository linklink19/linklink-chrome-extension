<script lang="ts">
    import { current_lili, current_tab, user_lilis } from '$lib/stores';
    import { onMount } from 'svelte';
    import { type LiliOutput, LiliService, LinkService } from '$lib/api/openapi';
    import { WEBSITE_URL } from '$lib/constants';
    import { zero_uuid } from '$lib/uuid';
    import { refresh_user_lilis } from '$lib/api_helpers';

    onMount(async () => {
        await refresh_user_lilis();
    });

    let filter_value = '';
    $: show_lilis = $user_lilis.filter((lili) => {
        return lili.name.toLowerCase().includes(filter_value.toLowerCase());
    });
    let hovering_id = '';

    let is_already_added = (lili: LiliOutput) => {
        return lili.links.some((link) => link.url === $current_tab?.url) === true;
    }

    async function add_link_to_lili(lili: LiliOutput) {
        try {
            let new_links = await LinkService.linkPost(
                {
                    liliId: lili.id,
                    requestBody: [
                        {
                            id: zero_uuid,
                            lili_id: lili.id,
                            order_in_list: 0,
                            url: $current_tab?.url ?? '',
                            name: $current_tab?.title ?? '',
                            description: '',
                        }
                    ]
                }
            );
            lili.links = [...new_links, ...lili.links]; // technically order is broken here.
            show_lilis = [...show_lilis]; // update
        } catch (e) {
            alert("Error saving link");
        }
    }

</script>

<input placeholder="Filter LinkLinks..." class="input h-[40px] px-4 mx-4 mr-4 w-[440px]" bind:value={filter_value} autofocus/>

<div class="max-h-[440px] max-w-full overflow-y-auto overflow-x-clip flex flex-col gap-2 w-full pl-4 pr-2">
    {#each show_lilis as lili}
        <div class="flex max-h-14 min-h-14 rounded justify-between w-full h-full border border-gray-500"
            on:mouseenter={() => {
                hovering_id = lili.id;
            }}
            on:mouseleave={() => {
                if (hovering_id === lili.id) {
                    hovering_id = '';
                }
            }}
        >
            <a class="flex flex-col w-full backdrop-blur-xl truncate h-full p-2 pt-1"
                href={`/lili/?id=${lili.id}`}
            >
                <h1 class="text-base h-6 text-white" class:underline={hovering_id === lili.id}>{lili.name}</h1>
                <span class="text-xs h-4 flex truncate"> <i class="fas fa-link translate-y-0.5 pr-0.5"/> {lili.n_links} {lili.description !== '' ? `-` : ``} {lili.description}</span>
            </a>
            <div class="flex min-h-full">
                <button on:click={() => {
                    chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili.id}` });
                }} class="fas fa-up-right-from-square sqbtn text-lg"> </button>

                {#if is_already_added(lili)}
                    <div class="flex items-center justify-center align-center sqbtn text-green-500 text-xl" disabled>
                        <i class="fa-regular fa-circle-check"></i>
                    </div>
                {:else}
                    <button class="fas fa-square-plus hover:variant-ghost-success min-h-full border-l-[1px] border-gray-500 w-12 text-xl text-green-500"
                        on:click={add_link_to_lili(lili)}
                    ></button>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .sqbtn {
        @apply hover:variant-ghost w-12 min-h-full border-l-[1px] border-gray-500;
    }
</style>