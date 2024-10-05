
<script lang="ts">
    // get from query param
    import LinkComponent from '$lib/components/LinkComponent.svelte';
    import { pinned_extension_page, user_lilis } from '$lib/stores';
    import { type LiliOutput, LiliService } from '$lib/api/openapi';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { WEBSITE_URL } from '$lib/constants';

    export let data;

    let lili_id = data.id;
    let lili: LiliOutput | undefined = $user_lilis.find((lili) => lili.id === lili_id);

    onMount(async () => {
        if (lili === undefined && lili_id !== undefined) {
            lili = await LiliService.liliIdGet({ id: lili_id ?? '' });
        } else if (lili_id === undefined) {
            goto('/')
        };
    });

    let pinned = $pinned_extension_page !== null;
    let toggle_pin = async () => {
        if (lili !== undefined) {
            pinned = !pinned;
            if (pinned) {
                pinned_extension_page.set(`lili/?id=${lili.id}`);
            } else {
                pinned_extension_page.set(null);
            }
        }
    };

</script>

{#if lili !== undefined}
    <div class="max-h-[500px] min-w-[448px] max-w-[448px]
        overflow-y-auto overflow-x-clip flex flex-col w-full gap-2 mx-3 pt-2 pl-1
    ">
        <div class="p-2.5 gap-4 flex flex-col">
            <div class="flex justify-center items-center align-middle gap-2 pt-4">
                <button on:click={toggle_pin} class="min-w-5 min-h-5">
                    <i class="fas fa-thumbtack text-lg hover:text-xl"
                       class:-rotate-45={!pinned}
                       class:text-gray-400={!pinned}
                       class:text-yellow-400={pinned}
                       class:hover:text-white={true}
                    />
                </button>
                <button on:click={() => {
                        chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili?.id}` });
                    }} class="hover:underline flex flex-nowrap items-center gap-2">
                    <span class="text-2xl">{lili.name}</span>
                    <i class="fas fa-up-right-from-square text-lg"></i>
                </button>
            </div>
            {#if lili.description !== ''}
                <div class="px-2 text-center font-light">
                    <span>{lili.description}</span>
                </div>
            {/if}
        </div>
        <div class="gap-2 flex flex-col">
            {#each lili.links as link}
                <LinkComponent {link} />
            {/each}
        </div>
    </div>
{/if}
