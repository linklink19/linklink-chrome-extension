<script lang="ts">
    import { LinkService } from '$lib/api/openapi';
    import { account_info_store, client_settings } from '$lib/stores';

    let show_saved = false;
    let awaiting_single_link_save = false;
    const saved_notification = () => {
        show_saved = true;
        setTimeout(() => {
            show_saved = false;
        }, 1500);
    };

    const save_current_link = () => {
        console.log('current link');
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
            let tab = tabs[0];
            console.log(tab);
            try {
                awaiting_single_link_save = true;
                let saved_link = await LinkService.linkPost(
                    $client_settings.target_lili?.id ?? $account_info_store!.workspace_id,
                    [
                        {
                            order_in_list: 0,
                            name: tab.title!,
                            url: tab.url!
                        }
                    ]
                );
                if (saved_link !== null) {
                    saved_notification();
                }
            } catch {
                console.log('error saving link');
            } finally {
                awaiting_single_link_save = false;
            }
        });
    };
</script>

<button
    class="btn rounded w-full h-12"
    class:variant-ghost-surface={!show_saved}
    class:variant-ghost-success={show_saved}
    on:click={save_current_link}
    disabled={awaiting_single_link_save || show_saved}
>
    {#if show_saved}
        <i class="fas fa-check-circle w-8 p-1"></i>
        <span> Saved!</span>
    {:else}
        <i class="fas fa-bookmark text-yellow-500 w-8 p-1"></i>
        <span>
            Save
            {$client_settings.target_lili?.name
                ? `to ${$client_settings.target_lili.name}`
                : 'URL'}
        </span>
    {/if}
</button>
