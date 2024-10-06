
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

    export let data;

    let lili: LiliOutput = data.lili;

    onMount(async () => {
        if (lili === undefined && lili.id !== undefined) {
            lili = await LiliService.liliIdGet({ id: lili.id ?? '' });
        } else if (lili.id === undefined) {
            goto('/')
        };
    });

    let pinned = $pinned_extension_page !== null;
    let toggle_pin = async () => {
        if (lili !== undefined) {
            pinned = !pinned;
            if (pinned) {
                pinned_extension_page.set(`lili/?id=${lili.id}`);
            } else {
                pinned_extension_page.set(null);
            }
        }
    };

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
    <div class="max-h-[530px] min-w-[468px] max-w-[468px]
        overflow-y-auto flex flex-col w-full gap-2 mx-3 pt-2 pl-1 text-xl
    ">
        <div class="p-2.5 gap-4 grid grid-cols-6">
            <Tooltip tip="Back" bottom>
                <a class="sqbtntop group text-3xl hover:text-4xl"
                 class:invisible={'/index.html' === $page.url.pathname || '/' === $page.url.pathname}
                 href="/"
                   on:click={() => {$pinned_extension_page = null;}}
                >
                    <i class="fas fa-caret-left"></i>
                </a>
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
            <Tooltip tip="Delete LinkLink" bottom>
                <button on:click={() => {show_delete_modal = true}} class="sqbtntop group">
                    <i class={`fas fa-trash group-hover:text-2xl group-hover:text-red-500`} />
                </button>
            </Tooltip>
            <Tooltip tip="Open LinkLink as tabs" bottom>
                <button on:click={open_links_as_tabs} class="sqbtntop group">
                    <i class={`fas fa-window-restore group-hover:text-2xl group-hover:text-[#08FAF5]`} />
                </button>
            </Tooltip>
            {#if !is_already_added}
            <Tooltip tip="Add current tab" bottom>
                <button on:click={add_link_to_lili} class="sqbtntop group">
                    <i class={`fas fa-angle-down group-hover:text-2xl group-hover:text-[#08FAF5]`} />
                </button>
            </Tooltip>
            {:else}
            <Tooltip tip="Already added" bottom>
                <button class="sqbtntop group" disabled>
                    <i class="fas fa-check text-[#7DE95E]" />
                </button>
            </Tooltip>
            {/if}
            {#if !pinned}
                <Tooltip tip='Pin' bottom>
                    <button on:click={toggle_pin} class="sqbtntop group place-self-end">
                        <i class="fas fa-thumbtack group-hover:text-2xl group-hover:text-white -rotate-45 text-gray-400"/>
                    </button>
                </Tooltip>
            {:else}
                <Tooltip tip='Unpin' bottom>
                    <button on:click={toggle_pin} class="sqbtntop group place-self-end">
                        <i class="fas fa-thumbtack group-hover:text-2xl  text-[#08FAF5]"/>
                    </button>
                </Tooltip>
            {/if}
        </div>
        <div class="p-2.5 gap-4 flex align-middle justify-center group relative">
                <button on:click={() => {chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili?.id}` });}}
                    class="relative flex-1 mx-2 text-center overflow-hidden">
                    <h1 class="block whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline text-auto h-6"
                        title={lili.name}>
                        <i class="fas fa-up-right-from-square text-xl pr-2 group-hover:scale-110"></i>
                        {lili.name}
                    </h1>
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
                <LinkComponent {link} />
            {/each}
        </div>
    </div>
{/if}

<style>
    .sqbtntop {
        @apply w-14 h-14 min-h-14 max-h-14 min-w-14 max-w-14 variant-ringed flex items-center justify-center rounded;
    }
</style>