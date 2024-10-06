
<script lang="ts">
    // get from query param
    import LinkComponent from '$lib/components/LinkComponent.svelte';
    import { pinned_extension_page, user_lilis } from '$lib/stores';
    import { BookmarkService, type LiliOutput, LiliService } from '$lib/api/openapi';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { WEBSITE_URL } from '$lib/constants';
    import { page } from '$app/stores';
    import Tooltip from 'sv-tooltip';
    import DeleteLiliModal from '$lib/components/modals/DeleteLiliModal.svelte';

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
    let show_delete_modal = true;

</script>

<!--{#if lili !== undefined} Because of prerender bullshit-->
{#if lili !== undefined}
    <DeleteLiliModal bind:show={show_delete_modal} lili={lili}/>
    <div class="max-h-[500px] min-w-[448px] max-w-[448px]
        overflow-y-auto flex flex-col w-full gap-2 mx-3 pt-2 pl-1 text-xl
    ">
        <div class="p-2.5 gap-4 flex justify-center">
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
                        <i class="fas fa-bookmark group-hover:text-2xl text-yellow-500 group-hover:text-[#08FAF5]"/>
                    {:else}
                        <i class="far fa-bookmark group-hover:text-2xl group-hover:text-[#08FAF5]"/>
                    {/if}
                </button>
            </Tooltip>
            <Tooltip tip="Delete LinkLink" bottom>
                <button on:click={() => {show_delete_modal = true}} class="sqbtntop group">
                    <i class={`fas fa-trash group-hover:text-2xl group-hover:text-error-400`} />
                </button>
            </Tooltip>
            <Tooltip tip="Open list as tabs" bottom>
                <button on:click={toggle_pin} class="sqbtntop group">
                    <i class={`fas fa-window-restore group-hover:text-2xl group-hover:text-[#08FAF5]`} />
                </button>
            </Tooltip>
            <Tooltip tip="Add current tab" bottom>
                <button on:click={() => {}} class="sqbtntop group">
                    <i class={`fas fa-square-plus group-hover:text-2xl group-hover:text-[#08FAF5]`} />
                </button>
            </Tooltip>
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
        <div class="p-2.5 gap-4 flex align-middle justify-center">
                <button on:click={() => {chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili?.id}` });}}
                    class="relative flex-1 mx-2 text-center overflow-hidden group">
                    <h1 class="block whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline text-auto h-6"
                        title={lili.name}>
                        <i class="fas fa-up-right-from-square text-xl pr-2"></i>
                        {lili.name}
                    </h1>
                </button>
        </div>
        {#if lili.description !== ''}
            <div class="px-2 text-center font-light">
                <span>{lili.description}</span>
            </div>
        {/if}
        <div class="gap-2 flex flex-col overflow-x-clip">
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