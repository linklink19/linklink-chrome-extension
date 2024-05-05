<script lang="ts">
    import { WEBSITE_URL } from '$lib/constants';
    import { account_info_store } from '$lib/stores';
    import { Avatar } from '@skeletonlabs/skeleton';

    const get_initals = (name: string): string => {
        const words = name.split(' ');
        if (words.length == 1) {
            return words[0].substring(0, 2);
        } else {
            return words[0].substring(0, 1) + words[1].substring(0, 1);
        }
    };

    const goto_profile = () => {
        chrome.tabs.create({ url: `${WEBSITE_URL}/profile` });
    };
</script>

<div class="flex justify-between">
    <div class="flex items-center justify-start gap-2">
        {#if $account_info_store?.profile_picture_url}
            <Avatar
                src={$account_info_store?.profile_picture_url ?? ''}
                initials={get_initals($account_info_store?.name ?? '')}
                width="w-11"
                border="border-4 border-surface-300-600-token hover:!border-primary-500"
                cursor="cursor-pointer"
                on:click={goto_profile}
            />
        {/if}
        <span class="font-bold italic">@{$account_info_store?.username}</span>
    </div>
    <a
        class="btn btn-primary underline text-sm italic"
        href={`${WEBSITE_URL}/logout`}
        target="_blank">Sign Out</a
    >
</div>
