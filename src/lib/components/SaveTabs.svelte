<script lang="ts">
    import { LiliService } from '$lib/api/openapi';
    import { WEBSITE_URL } from '$lib/constants';
    import { client_settings, client_status } from '$lib/stores';
    import { tick } from 'svelte';

    let linklink_name = 'My New LinkLink';
    let linklink_name_to_save = '';
    let input_box: HTMLInputElement;

    let awaiting_tabs_save = false;

    const save_all_tabs = () => {
        linklink_name_to_save = linklink_name;
        chrome.tabs.query({ currentWindow: true }, actually_save_tabs_to_new_list);
        // reset
        linklink_name = 'My New LinkLink';
        $client_status.saving_all_tabs = false;
    };

    const actually_save_tabs_to_new_list = async (tabs) => {
        // tabs have .title and .url
        awaiting_tabs_save = true;
        try {
            let new_lili = await LiliService.liliPost({
                name: linklink_name_to_save,
                links: tabs.map((tab, idx) => {
                    return {
                        order_in_list: idx,
                        name: tab.title,
                        url: tab.url
                    };
                })
            });
            $client_settings.target_lili = { id: new_lili.id, name: new_lili.name };
            await chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${new_lili.id}` });
        } catch {
            console.log('error saving tabs');
        } finally {
            awaiting_tabs_save = false;
        }
    };
</script>

{#if $client_status.saving_all_tabs}
    <div class="flex items-center gap-2">
        <button
            class="h-8 w-8 fas fa-x text-sm text-error-500 hover:scale-125"
            on:click={() => {
                linklink_name = 'My New LinkLink';
                $client_status.saving_all_tabs = false;
            }}
        />
        <input
            type="text"
            class="w-full input"
            placeholder="LinkLink Name"
            bind:value={linklink_name}
            bind:this={input_box}
            on:focus={async () => {
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
            class="h-12 w-12 rounded btn variant-ghost"
            disabled={awaiting_tabs_save}
            on:click={save_all_tabs}
        >
            <i class="w-8 p-1 fas fa-window-restore"></i>
        </button>
    </div>
{:else}
    <button
        class="h-12 w-full rounded btn variant-ghost"
        on:click={async () => {
            $client_status.saving_all_tabs = true;
            await tick();
            input_box.focus();
            input_box.select();
        }}
    >
        <i class="w-8 p-1 fas fa-window-restore"></i>
        <span> Save All Tabs</span>
    </button>
{/if}
