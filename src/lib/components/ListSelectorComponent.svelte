<script lang="ts">
    import { WEBSITE_URL } from '$lib/constants';
    import { account_info_store } from '$lib/stores';

    const open_workspace = () => {
        console.log('open workspace');
        chrome.tabs.create({
            url: `${WEBSITE_URL}/lili/${$account_info_store!.workspace_id}`
        });
    };
</script>

<button class="btn variant-ghost rounded h-12 w-full" on:click={open_workspace}>
    <i class="fas fa-share w-8 p-1"></i>
    <span> Workspace</span>
</button>
