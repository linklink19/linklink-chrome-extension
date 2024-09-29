
<script lang="ts">
    import { LiliService, type Link, LinkService } from '$lib/api/openapi';
    import { zero_uuid } from '$lib/uuid';
    import { refresh_user_lilis } from '$lib/api_helpers';
    import { catchEnter } from '$lib/components/catch_enter_directive';
    import Modal from '$lib/components/modals/Modal.svelte';
    import { user_lilis } from '$lib/stores';
    import { goto } from '$app/navigation';

    let creating = false;
    export let show = false;
    let update_n_tabs = async (_show: boolean) => {
        if (!_show) {
            return '';
        }
        choice = null;
        let tabs = await chrome.tabs.query({ currentWindow: true });
        n_tabs = tabs.length;
        return '';
    }
    let create_linklink = async () => {
        if (creating) {
            return;
        }
        creating = true;
        let new_lili = null;
        try {
            let tabs = await chrome.tabs.query({ currentWindow: true });
            let links = tabs.map((tab, idx) => {
                return {
                    id: zero_uuid,
                    lili_id: zero_uuid,
                    order_in_list: idx,
                    url: tab.url ?? '',
                    name: tab.title ?? '',
                    description: "",
                };
            });
            new_lili = await LiliService.liliPost({ requestBody: {
                    id: zero_uuid,
                    name: linklink_title,
                    description: "",
                    links: links,
                    public_access: false,
                    unlisted: false
                }
            });
        } catch (e) {
            alert("Error creating LinkLink");
        }
        try {
            await refresh_user_lilis();
        } catch (e) {
            alert("Error, try re-opening");
        }
        creating = false;
        show = false;
        if (new_lili) {
            goto(`/lili/?id=${new_lili.id}`);
        }
    }
    let choice: "existing" | "new" | null = null;
    let linklink_title = "My New LinkLink";
    let n_tabs = 0;
    $: update_n_tabs(show)

    async function add_to_lili(lili_id: string) {
        if (creating) {
            return;
        }
        creating = true;
        let created_links = null;
        try {
            let tabs = await chrome.tabs.query({ currentWindow: true });
            let links = tabs.map((tab, idx) => {
                return {
                    id: zero_uuid,
                    lili_id: zero_uuid,
                    order_in_list: idx,
                    url: tab.url ?? '',
                    name: tab.title ?? '',
                    description: "",
                };
            });
            created_links = await LinkService.linkPost(
                {
                    liliId: lili_id,
                    requestBody: links
                }
            );
        } catch (e) {
            alert("Error adding to LinkLink");
        }
        try {
            await refresh_user_lilis();
        } catch (e) {
            alert("Error, try re-opening");
        }
        creating = false;
        show = false;
        if (created_links) {
            goto(`/lili/?id=${lili_id}`);
        }
    }
</script>


<Modal bind:showModal={show}>
    <svelte:fragment slot="header">
        <p class="font-xl">Save all open Tabs ({n_tabs})</p>
    </svelte:fragment>
    <!--{update_n_tabs()}-->
    <div class="flex flex-col flex-1 min-w-[400px] gap-2">
    {#if choice === null}
        <button on:click={() => {choice = "new"}} class="btn variant-ghost hover:variant-glass-secondary rounded">Save to New LinkLink</button>
        <button on:click={() => {choice = "existing"}} class="btn variant-ghost hover:variant-glass-secondary rounded">Save to Existing LinkLink</button>
    {:else if choice === "new"}
        <input class="input" placeholder="LinkLink Title..." bind:value={linklink_title} use:catchEnter on:submit={create_linklink} autofocus/>
        <button on:click={create_linklink} class="btn variant-ghost-primary rounded">Save</button>
    {:else if choice === "existing"}
        <div class="flex flex-col gap-2">
            {#each $user_lilis as lili}
                <button class="btn variant-ghost hover:variant-glass-secondary w-full h-10" on:click={() => {
                    add_to_lili(lili.id)
                }}>
                    {lili.name}
                </button>
            {/each}
        </div>

    {/if}


    </div>
</Modal>



