
<script lang="ts">
    import { LiliService } from '$lib/api/openapi';
    import { zero_uuid } from '$lib/uuid';
    import { refresh_user_lilis } from '$lib/api_helpers';
    import { catchEnter } from '$lib/components/catch_enter_directive';
    import Modal from '$lib/components/modals/Modal.svelte';

    let linklink_title: string = "";
    let creating = false;
    export let show = false;
    let create_linklink = async () => {
        if (creating) {
            return;
        }
        creating = true;

        let links = [];
        if (add_all_tabs) {
            let tabs = await chrome.tabs.query({ currentWindow: true });
            links = tabs.map((tab, idx) => {
                return {
                    id: zero_uuid,
                    lili_id: zero_uuid,
                    order_in_list: idx,
                    url: tab.url ?? '',
                    name: tab.title ?? '',
                    description: "",
                };
            });
        }
        try {

            await LiliService.liliPost({ requestBody: {
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
    }
    let add_all_tabs = false;
</script>


<Modal bind:showModal={show}>
    <svelte:fragment slot="header">
        <p class="font-xl">Create Linklink</p>
    </svelte:fragment>
    <div class="flex flex-col flex-1 min-w-[400px] gap-2">
        <input class="input" placeholder="LinkLink Title..." bind:value={linklink_title} use:catchEnter on:submit={create_linklink} autofocus/>
        <div class="flex gap-3 pl-2 items-center"><input type="checkbox" class="checkbox" bind:checked={add_all_tabs}><span>Add all tabs in current window</span></div>
        <button on:click={create_linklink} class="btn variant-ghost hover:variant-glass-secondary rounded">Create</button>
    </div>
</Modal>



