<script lang="ts">
    export let showModal: boolean = false;
    export let title: string = '';

    let dialog: HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal();
    $: if (dialog && !showModal) dialog.close();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => {showModal = false}}
    on:click|self={() => dialog.close()}
    class=" hide-scrollbar modal text-white rounded-lg backdrop-blur shadow-xl border border-gray-400 card"
>
    <!--    This if statement is here so that the component does not get mounted before it is supposed to.-->
    {#if showModal}
        <div class="py-3 px-3 sm:px-6">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click|stopPropagation>
                <div class="flex justify-between h-8 items-center">
                    <slot name="header">
                        <div class="h-8 flex items-center pr-2">{title}</div>
                    </slot>
                    <!-- X to close in top right-->
                    <button on:click={() => dialog.close()}
                            class="hover:scale-110 transition ease-in-out duration-300 flex items-center -translate-y-1 -translate-x-1 sm:translate-x-0.5">
                        <i class="fas fa-circle-xmark text-xl" />
                    </button>
                </div>
                <hr />
                <div class="">
                    <slot />
                </div>
            </div>
        </div>
    {:else}
        Something went wrong.
    {/if}
</dialog>

<style>
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
        backdrop-filter: blur(5px);
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
