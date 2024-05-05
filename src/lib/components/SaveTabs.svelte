<script lang="ts">
    import { LiliService } from '$lib/api/openapi';
    import { WEBSITE_URL } from '$lib/constants';
    import { client_status } from '$lib/stores';
    import { tick } from 'svelte';

    let linklink_name = 'My New LinkLink';
    let linklink_name_to_save = '';
    let input_box: HTMLInputElement;

    let awaiting_tabs_save = false;

    const save_all_tabs = () => {
        console.log('all tabs');
        linklink_name_to_save = linklink_name;
        chrome.tabs.query({ currentWindow: true }, actually_save_tabs_to_new_list);
        // reset
        linklink_name = 'My New LinkLink';
        $client_status.saving_all_tabs = false;
    };

    const actually_save_tabs_to_new_list = async (tabs) => {
        // tabs have .title and .url
        console.log(tabs);
        awaiting_tabs_save = true;
        try {
            let lili_out = await LiliService.createLiliPost({
                name: linklink_name_to_save,
                links: tabs.map((tab, idx) => {
                    return {
                        order_in_list: idx,
                        name: tab.title,
                        url: tab.url
                    };
                })
            });
            // saved_notification();
            // TODO: save notification (???)
            console.log(lili_out);
            if (lili_out !== null) {
                chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili_out.id}` });
            }
        } catch {
            console.log('error saving tabs');
        } finally {
            awaiting_tabs_save = false;
        }
    };
</script>

{#if $client_status.saving_all_tabs}
    <div class="flex gap-2 items-center">
        <input
            type="text"
            class="input w-full"
            placeholder="LinkLink Name"
            bind:value={linklink_name}
            bind:this={input_box}
            on:focus={() => {
                input_box.select();
            }}
            disabled={awaiting_tabs_save}
            on:keydown={(e) => {
                if (e.key === 'Enter') {
                    save_all_tabs();
                }
            }}
        />
        <button
            class="btn variant-ghost rounded h-12 w-12"
            disabled={awaiting_tabs_save}
            on:click={save_all_tabs}
        >
            <i class="fas fa-save w-8 p-1"></i>
        </button>
    </div>
{:else}
    <button
        class="btn variant-ghost rounded h-12 w-full"
        on:click={async () => {
            $client_status.saving_all_tabs = true;
            await tick();
            input_box.focus();
        }}
    >
        <i class="fas fa-save w-8 p-1"></i>
        <span> Save All Tabs</span>
    </button>
{/if}
