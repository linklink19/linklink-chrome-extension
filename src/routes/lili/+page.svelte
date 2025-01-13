
<script lang="ts">
    // get from query param
    import LinkComponent from '$lib/components/LinkComponent.svelte';
    import { current_tab, pinned_extension_page, user_lilis } from '$lib/stores';
    import { BookmarkService, type LiliOutput, LiliService, LinkService } from '$lib/api/openapi';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { WEBSITE_URL } from '$lib/constants';
    import { page } from '$app/stores';
    import Tooltip from 'sv-tooltip';
    import DeleteLiliModal from '$lib/components/modals/DeleteLiliModal.svelte';
    import { zero_uuid } from '$lib/uuid';
    import { add_all_tabs, has_all_tabs } from '$lib/api_helpers';

    export let data;

    let lili: LiliOutput = data.lili;
    let pinned = $pinned_extension_page !== null;

    onMount(async () => {
        $pinned_extension_page = `lili/?id=${lili.id}`;
        if (lili === undefined && lili.id !== undefined) {
            lili = await LiliService.liliIdGet({ id: lili.id ?? '' });
        } else if (lili.id === undefined) {
            goto('/')
        };
    });

    let toggle_bookmark = async () => {
        try {
            let n_bookmarks = await BookmarkService.bookmarkPost({ liliId: lili.id, bookmark: !lili.bookmarked });
            lili.bookmarked = !lili.bookmarked;
            lili.n_bookmarks = n_bookmarks;
        } catch (e) {
            console.error(e);
        }
    };
    let show_delete_modal = false;

    let open_links_as_tabs = async () => {
        let urls = lili.links.map((link) => link.url);
        chrome.windows.create({ url: urls }, function(window) {
            console.log('New window created with 5 tabs:', window);
        });
    };

    // Note: optional needed because prerender
    $: is_already_added = lili?.links.some((link) => link.url === $current_tab?.url) === true;
    async function add_link_to_lili() {
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
        } catch (e) {
            alert("Error saving link");
        }
    }

</script>

<!--{#if lili !== undefined} Because of prerender bullshit-->
{#if lili !== undefined}
    <DeleteLiliModal bind:show={show_delete_modal} lili={lili}/>
    <div class="flex flex-col gap-2 overflow-y-auto max-h-[530px] overflow-x-hidden">
        <div class="p-2.5 gap-4 grid grid-cols-6">
            <Tooltip tip="Back" bottom>
                <a class="sqbtntop group text-3xl hover:text-4xl hover:text-[#08FAF5]"
                 class:invisible={'/index.html' === $page.url.pathname || '/' === $page.url.pathname}
                 href="/"
                   on:click={() => {$pinned_extension_page = null;}}
                >
                    <i class="fas fa-caret-left"></i>
                </a>
            </Tooltip>
            <Tooltip tip="Delete LinkLink" bottom>
                <button on:click={() => {show_delete_modal = true}} class="sqbtntop group">
                    <i class={`fas fa-trash group-hover:text-2xl group-hover:text-red-500`} />
                </button>
            </Tooltip>
            <Tooltip tip="Open LinkLink As Tabs" bottom>
                <button on:click={open_links_as_tabs} class="sqbtntop group">
                    <i class={`fa-regular fa-share-from-square group-hover:text-2xl group-hover:text-[#08FAF5]`} />
                </button>
            </Tooltip>
            <Tooltip tip="Toggle Bookmark" bottom>
                <button on:click={toggle_bookmark} class="sqbtntop group">
                    {#if lili.bookmarked}
                        <i class="fas fa-bookmark group-hover:text-2xl text-[#08FAF5]"/>
                    {:else}
                        <i class="far fa-bookmark group-hover:text-2xl group-hover:text-[#08FAF5]"/>
                    {/if}
                </button>
            </Tooltip>
            {#if has_all_tabs(lili)}
                    <Tooltip tip="Already Added Tabs" bottom>
                    <div class="flex items-center justify-center align-center sqbtn-left text-green-500 text-xl" disabled>
                        <i class="fa-solid fa-check-double"></i>
                    </div>
                    </Tooltip>
                {:else}
                    <Tooltip tip="Add All Tabs" bottom>
                        <button class="sqbtntop group hover:text-[#08FAF5]"
                            on:click={() => {
                                add_all_tabs(lili);
                            }}
                        >
                            <i class="fas fa-list-check w-5 h-5"/>
                        </button>
                    </Tooltip>
                {/if}

            {#if !is_already_added}
                <Tooltip tip="Add Current Tab" bottom>
                    <button on:click={add_link_to_lili} class="sqbtntop group">
                        <i class={`fas fa-square-plus group-hover:text-2xl group-hover:text-[#08FAF5]`} />
                    </button>
                </Tooltip>
            {:else}
                <Tooltip tip="Already Added" bottom>
                    <button class="sqbtntop group" disabled>
                        <i class="fas fa-check text-[#7DE95E]" />
                    </button>
                </Tooltip>
            {/if}
        </div>
        <div class="gap-4 flex align-middle justify-center group relative rounded-lg">
                <button on:click={() => {chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili?.id}` });}}
                    class="relative flex-1 text-center overflow-hidden
                           border border-transparent hover:border-white
                           p-2.5 rounded-lg">
                    <div class="block whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline
                                justify-items-center content-center text-3xl"
                        title={lili.name}>
                        <span>{lili.name}</span>
                        <i class="fas fa-up-right-from-square text-xl pr-3 group-hover:scale-110 -translate-y-1" />
                    </div>
                </button>
            <span class="absolute -bottom-6 card group-hover:block hidden p-1 rounded text-xs">linklink.ink/lili/{lili.id}</span>
        </div>
        {#if lili.description !== ''}
            <div class="px-2 text-center font-light text-sm py-2">
                <span>{lili.description}</span>
            </div>
        {/if}
        <div class="gap-2 flex flex-col overflow-x-clip p-2.5 pr-3">
            {#each lili.links as link}
                {#if link.is_section}
                    <h1 class="pt-4 pb-2">{link.name}</h1>
                {:else}
                    <LinkComponent {link} />
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>
    .sqbtntop {
        @apply w-14 h-14 min-h-14 max-h-14 min-w-14 max-w-14 variant-ringed flex items-center justify-center rounded;
    }
</style>