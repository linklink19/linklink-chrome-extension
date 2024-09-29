
<script lang="ts">
    // get from query param
    import LinkComponent from '$lib/components/LinkComponent.svelte';
    import { user_lilis } from '$lib/stores';
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

</script>

{#if lili !== undefined}
    <div
        class="flex flex-col gap-2 mx-3 pt-2"
    >
        <div class="p-2.5">
            <button on:click={() => {
                    chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili?.id}` });
                }} class="hover:underline w-full py-4">
                <span class="text-2xl">{lili.name}</span>
                <i class="fas fa-up-right-from-square sqbtn text-lg"></i>
            </button>
            <div class="px-2 text-center font-light">
                <span>{lili.description}</span>
            </div>
        </div>
        <div class="gap-2 flex flex-col">
            {#each lili.links as link}
                <LinkComponent {link} />
            {/each}
        </div>
    </div>
{/if}

