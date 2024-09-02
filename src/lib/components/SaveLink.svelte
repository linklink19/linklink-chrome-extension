<script lang="ts">
    import { ApiError, LinkService } from '$lib/api/openapi';
    import { account_info_store, client_settings } from '$lib/stores';
    import { onMount } from 'svelte';

    let show_saved = false;
    let awaiting_single_link_save = false;
    const saved_notification = () => {
        show_saved = true;
        setTimeout(() => {
            show_saved = false;
        }, 1500);
    };
    let tab: chrome.tabs.Tab | null = null;
    const save_set_tab = async () => {
        awaiting_single_link_save = true;
        try {
            await LinkService.linkPost({
                liliId: $client_settings.target_lili!.id,
                requestBody: [
                    {
                        id: '00000000-0000-0000-0000-000000000000',
                        lili_id: $client_settings.target_lili!.id,
                        order_in_list: 0,
                        url: tab!.url!,
                        description: '',
                        name: tab!.title!
                    }
                ]
            });
            saved_notification();
            $client_settings = $client_settings;
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                alert(error.body.detail);
            } else {
                alert('An error occurred while saving the link');
            }
            show_saved = false;
        } finally {
            awaiting_single_link_save = false;
        }
    };

    const save_current_link = () => {
        save_set_tab();
    };
    onMount(() => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            tab = tabs[0];
        });
    });
</script>

<button
    class="h-12 w-full rounded btn"
    class:variant-ghost-surface={!show_saved}
    class:variant-ghost-success={show_saved}
    on:click={save_current_link}
    disabled={awaiting_single_link_save || show_saved}
>
    {#if show_saved}
        <i class="w-8 p-1 fas fa-check-circle"></i>
        <span> Saved!</span>
    {:else}
        <i class="w-8 p-1 text-yellow-500 fas fa-bookmark"></i>
        <span>
            Save
            {$client_settings.target_lili?.name ? `to ${$client_settings.target_lili.name}` : 'URL'}
        </span>
    {/if}
</button>
