
<script lang="ts">
    import { LiliService, type Link } from '$lib/api/openapi';
    import { zero_uuid } from '$lib/uuid';
    import { refresh_user_lilis } from '$lib/api_helpers';
    import { catchEnter } from '$lib/components/catch_enter_directive';
    import Modal from '$lib/components/modals/Modal.svelte';
    import { goto } from '$app/navigation';

    let linklink_title: string = "New LinkLink";
    let creating = false;
    export let show = false;
    let create_linklink = async () => {
        if (creating) {
            return;
        }
        creating = true;

        let links: Array<Link> = [];
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

            let response = await LiliService.liliPost({ requestBody: {
                    id: zero_uuid,
                    name: linklink_title,
                    description: "",
                    links: links,
                    public_access: false,
                    unlisted: false
                }
            });
            await refresh_user_lilis();
            chrome.tabs.create({ url: `https://linklink.ink/lili/${response.id}` });
            // await goto(`/lili/?id=${response.id}`, { replaceState: true, invalidateAll: true });
        } catch (e) {
            alert("Error creating LinkLink");
        }
        finally {
            creating = false;
            show = false;
        }
    }
    let add_all_tabs = false;
    let title_input_element: HTMLInputElement;

    $: if (show) {
        setTimeout(() => {
            title_input_element.focus();
            title_input_element.select();
        }, 50);
    }
</script>


<Modal bind:showModal={show}>
    <svelte:fragment slot="header">
        <p class="font-xl">Create Linklink</p>
    </svelte:fragment>
    <div class="flex flex-col flex-1 min-w-[400px] gap-4">
        <input class="input cursor-pointer rounded-lg" placeholder="LinkLink Title..."
               bind:value={linklink_title} use:catchEnter on:submit={create_linklink}
               bind:this={title_input_element}
        />
            <label class="flex gap-3 pl-2 items-center">
                <input type="checkbox" class="checkbox" bind:checked={add_all_tabs}>
                <span>Add all tabs in current window</span>
            </label>
        <button on:click={create_linklink} disabled={linklink_title.length === 0} class="btn variant-ghost hover:variant-glass-secondary rounded">Create</button>
    </div>
</Modal>



