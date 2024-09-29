<script lang="ts">
    import { account_info_store } from '$lib/stores';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import NewLinkLinkModal from '$lib/components/modals/NewLinkLinkModal.svelte';
    import SaveTabsModal from '$lib/components/modals/SaveTabsModal.svelte';

    $: is_home = $page.url.pathname === '/' || $page.url.pathname === '/index.html';

    const get_initials = (name: string): string => {
        const words = name.split(' ');
        if (words.length == 1) {
            return words[0].substring(0, 2);
        } else {
            return words[0].substring(0, 1) + words[1].substring(0, 1);
        }
    };
    const plus_or_back = async () => {
        if (is_home) {
            await goto('/');
        } else {
            await goto('/newlist');
        }
    };
    let profile_options = false;
    let show_new_linklink = false;
    let show_save_tabs = false;
</script>

<NewLinkLinkModal bind:show={show_new_linklink}/>
<SaveTabsModal bind:show={show_save_tabs}/>

<div class="flex justify-between items-center gap-2 h-full w-full px-2">
    {#if profile_options}
        <button class="btn variant-ringed hover:variant-ringed-primary rounded text-sm gap-1">
            <i class="fas fa-right-from-bracket"></i>
            Sign Out
        </button>
    {:else}
    <div class="flex justify-between gap-2">
        <a class="btn rounded text-sm"
           class:variant-ringed-error={true}
           class:hover:variant-glass-error={true}
           class:hidden={$page.url.pathname === '/index.html'}
           href="/">
            <i class="fas fa-caret-left"></i>
            <span>Back</span>
        </a>
        <button class="btn variant-ringed hover:variant-ringed-primary rounded text-sm gap-1"
                on:click={() => {show_new_linklink = true;}}
        >
            <i class="fas fa-square-plus"></i>
            <span>New LinkLink</span>
        </button>
        <button class="btn variant-ringed hover:variant-ringed-primary rounded text-sm gap-1"
            on:click={() => {show_save_tabs = true;}}
        >
            <i class="fas fa-window-restore"></i>
            <span>Save Tabs</span>
        </button>
    </div>
    {/if}
    <Avatar
        src={$account_info_store?.profile_picture_url ?? ''}
        initials={get_initials($account_info_store?.name ?? '')}
        width="w-11"
        border="border-4 border-surface-300-600-token hover:!border-primary-500"
        cursor="cursor-pointer"
        on:click={() => {profile_options = !profile_options}}
    />

</div>
