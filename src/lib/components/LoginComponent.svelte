<script lang="ts">
    import { WEBSITE_URL } from '$lib/constants';

    const goto_login = () => {
        chrome.tabs.create({ url: `${WEBSITE_URL}/login` });
    };
</script>

<div class="p-4">
    <button class="btn variant-ghost rounded hover:underline h-12 w-32" on:click={goto_login}>
        <i class="fas fa-sign-in-alt w-8"></i>
        <span>Login</span>
    </button>
</div>
