<script lang="ts">
    import LoginComponent from '$lib/components/LoginComponent.svelte';

    import { AuthService } from '$lib/api/openapi';
    import { account_info_store, pinned_extension_page } from '$lib/stores';
    import { onMount } from 'svelte';
    import UserLilis from '$lib/components/UserLilis.svelte';
    import { refresh_user_lilis } from '$lib/api_helpers';
    import { goto } from '$app/navigation';
    import Header from '$lib/components/Header.svelte';

    const check_login = async () => {
        // checks if logged in, tries refresh if not, sets account_info_store
        try {
            let account_info = await AuthService.authCheckAuthGet({});
            if (account_info) {
                console.log('logged in');
                $account_info_store = account_info;
            } else {
                console.log('not logged in');
                try {
                    await AuthService.authRefreshTokensPost({});
                } catch {}
                account_info = await AuthService.authCheckAuthGet({});
                if (account_info) {
                    console.log('logged in after refresh');
                    $account_info_store = account_info;
                } else {
                    console.log('not logged in after refresh');
                    $account_info_store = null;
                }
            }
            if (account_info) {
                await refresh_user_lilis();
                if ($pinned_extension_page !== null) {
                    goto($pinned_extension_page);
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
        await check_login();

    });
</script>

{#if $account_info_store}
    <Header />
    <div class="py-4 pt-2 flex flex-col gap-2 w-full">
        <UserLilis />
    </div>
{:else}
    <LoginComponent />
{/if}
