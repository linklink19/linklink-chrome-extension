
<script lang="ts">
    import Modal from '$lib/components/modals/Modal.svelte';
    import { type LiliOutput, LiliService } from '$lib/api/openapi';
    import { reset_to_home } from '$lib/api/navigation';

    export let lili: LiliOutput;
    export let show = false;
    let delete_lili = async () => {
        try {
            await LiliService.liliIdDelete({ id: lili.id });
            reset_to_home();
        } catch {
            alert("Error deleting");
        }
    }
</script>


<Modal bind:showModal={show}>
    <svelte:fragment slot="header">
        <p class="font-xl">Are you sure?</p>
    </svelte:fragment>
    <div class="flex flex-col min-w-[400px] gap-2">
        <span>Delete <span class="text-error-400">{lili.name}</span>?</span>
        <div class="flex w-full justify-center">
            <span class="italic ">This action is not reversible.</span>
        </div>
        <div class="flex gap-4">
            <button on:click={() => {show=false;}} class="btn w-full rounded border-2 border-transparent hover:border-gray-400">Cancel</button>
            <button on:click={delete_lili} class="btn rounded variant-filled-error border-2 border-transparent hover:border-error-400 w-full">Delete</button>
        </div>
    </div>
</Modal>

