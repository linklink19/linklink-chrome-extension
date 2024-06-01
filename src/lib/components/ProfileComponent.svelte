<script lang="ts">
    import { WEBSITE_URL } from '$lib/constants';
    import { account_info_store } from '$lib/stores';
    import { Avatar } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

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
</script>

<div class="flex justify-between align-center h-full items-center gap-2">
    <Avatar
        src={$account_info_store?.profile_picture_url ?? ''}
        initials={get_initials($account_info_store?.name ?? '')}
        width="w-11"
        border="border-4 border-surface-300-600-token hover:!border-primary-500"
        cursor="cursor-pointer"
    />
    <span class="font-bold italic h-full align">@{$account_info_store?.username}</span>
    <div class="flex-grow"/>
    <a
        class="hover:underline text-sm italic h-full"
        href={`${WEBSITE_URL}/logout`}
        target="_blank">
        Sign Out
    </a>
    {#if !is_home}
        <button
            class="btn h-full w-10 text-sm hover:underline italic"
            on:click={() => {goto('/');}}
        >
            Back
        </button>
    {:else}
        <button
            class="btn text-success-500 text-xl h-full w-10 hover:scale-125 fas fa-circle-plus"
            on:click={() => {goto('/newlist');}}
        />
    {/if}

</div>
