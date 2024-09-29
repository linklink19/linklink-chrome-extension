<script lang="ts">
    import LoginComponent from '$lib/components/LoginComponent.svelte';

    import { AuthService } from '$lib/api/openapi';
    import { account_info_store } from '$lib/stores';
    import { onMount } from 'svelte';
    import UserLilis from '$lib/components/UserLilis.svelte';

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
                let account_info = await AuthService.authCheckAuthGet({});
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
        await check_login();
    });
</script>

{#if $account_info_store}
    <div class="py-4 pt-2 flex flex-col gap-2 max-w-full">
        <UserLilis />
    </div>
{:else}
    <LoginComponent />
{/if}
