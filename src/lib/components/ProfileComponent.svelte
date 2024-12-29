<script lang="ts">
    import {
        account_info_store,
        auth_status, AuthStatus,
        current_lili,
        pinned_extension_page,
        pinned_lili_ids,
        user_lilis
    } from '$lib/stores';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import NewLinkLinkModal from '$lib/components/modals/NewLinkLinkModal.svelte';
    import { WEBSITE_URL } from '$lib/constants';
    import { tick } from 'svelte';

    $: is_home = $page.url.pathname === '/' || $page.url.pathname === '/index.html';

    const get_initials = (name: string): string => {
        const words = name.split(' ');
        if (words.length == 1) {
            return words[0].substring(0, 2);
        } else {
            return words[0].substring(0, 1) + words[1].substring(0, 1);
        }
    };
    let profile_options = false;
    let show_new_linklink = false;
    const logout = () => {
        pinned_extension_page.set(null);
        auth_status.set(AuthStatus.logged_out);
        current_lili.set(null);
        user_lilis.set([]);
        tick();
        tick();
        tick();

        chrome.tabs.create({ url: `${WEBSITE_URL}/logout` });
    }
</script>

<NewLinkLinkModal bind:show={show_new_linklink}/>

<div class="flex justify-between items-center gap-2 h-full w-full px-2">
    <button class="btn variant-ringed hover:variant-ringed-primary rounded text-sm gap-1 w-36 h-10"
            on:click={() => {show_new_linklink = true;}}
    >
        <i class="fas fa-square-plus"></i>
        <span>New LinkLink</span>
    </button>
    <div class="flex gap-2 items-center">
        <button class="btn variant-ringed hover:variant-ringed-primary rounded text-sm gap-1 h-10"
            on:click={logout}
        >
            <i class="fas fa-right-from-bracket"></i>
            Sign Out
        </button>
        <Avatar
            src={$account_info_store?.profile_picture_url ?? ''}
            initials={get_initials($account_info_store?.name ?? '')}
            width="w-11"
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            cursor="cursor-pointer"
            on:click={() => {profile_options = !profile_options}}
        />
    </div>

</div>
