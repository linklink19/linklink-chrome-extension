<script lang="ts">
    import { LiliService } from '$lib/api/openapi';
    import { tick } from 'svelte';
    import { client_settings } from '$lib/stores';
    import { WEBSITE_URL } from '$lib/constants';

    let creating_list = false;
    let linklink_name = 'My New LinkLink';
    let input_box: HTMLInputElement;
    let awaiting_lili_creation = false;

    const create_lili = async () => {
        awaiting_lili_creation = true;
        const new_lili = await LiliService.liliPost({
            name: linklink_name,
            links: []
        });
        $client_settings.target_lili = { id: new_lili.id, name: new_lili.name };
        await chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${new_lili.id}` });
        awaiting_lili_creation = false;
    };
</script>


{#if !creating_list}
<button
    class="h-12 w-full rounded btn variant-ghost-surface"
    on:click={async () => {
        creating_list = true;
        await tick();
        input_box.focus();
        input_box.select();
    }}
>
    <i class="pr-2 fas fa-circle-plus text-success-500" />
    New LinkLink
</button>
{:else}
 <div class="flex items-center gap-2">
        <button
            class="h-8 w-8 fas fa-x text-sm text-error-500 hover:scale-125"
            on:click={() => {
                linklink_name = 'My New LinkLink';
                creating_list = false;
            }}
        />
        <input
            type="text"
            class="w-full input"
            placeholder="LinkLink Name"
            bind:value={linklink_name}
            bind:this={input_box}
            disabled={awaiting_lili_creation}
            on:keydown={(e) => {
                if (e.key === 'Enter') {
                    create_lili();
                }
            }}
        />
        <button
            class="h-12 w-12 rounded btn variant-ghost"
            disabled={awaiting_lili_creation}
            on:click={create_lili}
        >
            <i class="w-8 p-1 fas fa-circle-plus text-success-500 text-lg"></i>
        </button>
    </div>
{/if}

