<script lang="ts">
    import { pinned_lili_ids, user_lilis } from '$lib/stores';
    import LiliComponent from '$lib/components/LiliComponent.svelte';


    let filter_value = '';
    $: show_lilis = $user_lilis.filter(
        (lili) => {
            return lili.name.toLowerCase().includes(filter_value.toLowerCase());
        }
    // ).sort( // NOTE: server does this sort and js can't sort for shit
    //     (lili_a, lili_b) => {
    //         // a less than b return -1
    //         if (lili_a.edited_at < lili_b.edited_at) {
    //             return -1;
    //         }
    //         else return 0;
    //     }
    ).sort(
        (lili_a, lili_b) => {
            let is_a_pinned = $pinned_lili_ids.includes(lili_a.id);
            let is_b_pinned = $pinned_lili_ids.includes(lili_b.id);
            if (is_a_pinned && !is_b_pinned) {
                return -1;
            }
            if (!is_a_pinned && is_b_pinned) {
                return 1;
            }
            return 0;
        }
    );
</script>

<div class="h-[40px] w-[455px] relative">
    <input placeholder="Filter LinkLinks..." class="input mx-4 rounded" bind:value={filter_value} autofocus/>
    <button on:click={() => {filter_value = ""}} class="fas fa-circle-xmark text-lg absolute -right-0 top-1.5 hover:text-red-300 hover:scale-110"
        class:hidden={filter_value === ""}
    />
</div>

<div class="max-h-[440px] max-w-full overflow-y-scroll overflow-x-clip flex flex-col gap-2 w-full pl-4 pr-2">
<!--    Note: always scrolling because of layout shift otherwise-->
    {#if show_lilis.length === 0}
        <div class="flex justify-center items-center h-14 w-full border border-gray-500 rounded">
            <span class="text-white text-lg">No LinkLinks found</span>
        </div>
    {/if}
    {#each show_lilis as lili}
        <LiliComponent {lili} on:update={() => {show_lilis = [...show_lilis]}} />
    {/each}
</div>
