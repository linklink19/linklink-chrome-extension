<script lang="ts">
    import ListSelectorComponent from '$lib/components/ListSelectorComponent.svelte';
    import LoginComponent from '$lib/components/LoginComponent.svelte';
    import ProfileComponent from '$lib/components/ProfileComponent.svelte';
    import SaveTabs from '$lib/components/SaveTabs.svelte';
    import SaveLink from '$lib/components/SaveLink.svelte';

    import { AuthService } from '$lib/api/openapi';
    import { account_info_store, client_status } from '$lib/stores';
    import { onMount } from 'svelte';

    const check_login = async () => {
        // checks if logged in, tries refresh if not, sets account_info_store
        try {
            let account_info = await AuthService.checkAuthAuthCheckAuthGet();
            if (account_info) {
                console.log('logged in');
                $account_info_store = account_info;
            } else {
                console.log('not logged in');
                try {
                    await AuthService.refreshTokensAuthRefreshTokensPost();
                } catch {}
                let account_info = await AuthService.checkAuthAuthCheckAuthGet();
                if (account_info) {
                    console.log('logged in after refresh');
                    $account_info_store = account_info;
                } else {
                    console.log('not logged in after refresh');
                    $account_info_store = null;
                }
            }
        } catch {
            console.log('error logging in');
            $account_info_store = null;
        }
    };

    onMount(async () => {
        // just check/refresh every time you open the thing. maybe not the best idea
        // but for now it's ok, no custom re-login if unauthorized bs.
        // this would only break client side if someone leaves the extension open for >15 mins
        check_login();
    });
</script>

{#if $account_info_store}
    <div class="flex flex-col gap-2 p-4 min-w-48" class:w-96={$client_status.saving_all_tabs}>
        <!-- class:w-96={saving_tabs} -->
        <!-- IGNORE START -->
        <!-- This HIDDEN button is only here because otherwise the button has an expansion animation when opening the extension, idk why. -->
        <button class="btn variant-ghost rounded h-12 hidden w-full">
            <span> Placeholder</span>
        </button>
        <!-- IGNORE END -->

        <SaveLink />
        <SaveTabs />
        <ListSelectorComponent />
        <ProfileComponent />
    </div>
{:else}
    <LoginComponent />
{/if}
