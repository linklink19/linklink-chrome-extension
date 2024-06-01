<script lang="ts">
    import { type Link, LinkService } from '$lib/api/openapi';

    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { clipboard } from '@skeletonlabs/skeleton';
    import { onMount, tick } from 'svelte';
    import { catchEnter } from './catch_enter_directive';

    export let link: Link;

    let editing_link = false;
    let hovering = false;
    export const enter_edit_mode = async () => {
        // close the thing
        await tick();
        link_edit_mode = true;
        await tick();
        name_input.focus();
        name_input.select();
    };

    export let link_edit_mode = false;
    let name_input: HTMLInputElement;
    $: favicon_url = link.url ? link.url : 'https://blank.page/';
    $: favicon_src = `https://www.google.com/s2/favicons?domain=${favicon_url}`;

    let popupSettings: PopupSettings = {
        event: 'click',
        target: link.id,
        placement: 'bottom'
    };

    let pre_edit_link: Link;
    onMount(async () => {
        pre_edit_link = structuredClone(link);
    });

    const submit_changes = async () => {
        if (!link_edit_mode) {
            return;
        }
        if (link.url.length == 0) {
            return;
        }
        await save_changes();
    };

    const save_changes = async () => {
        // TODO: make this faster.
        await LinkService.linkPut(link);
        pre_edit_link = structuredClone(link);
        link_edit_mode = false;
        hovering = false;
    };
    const discard_changes = async () => {
        link = structuredClone(pre_edit_link);
        link_edit_mode = false;
    };

    function copyHandler(): void {
        // todo
    }

    const delete_confirm = async () => {
        LinkService.linkDelete([link.id]);
    };
</script>

<!-- Main -->
<div
    class="m-0 box-border grid w-full max-w-full text-xl border-primary-500"
    class:opacity-60={link.id.startsWith('unconfirmed')}
    class:rounded={hovering && !link_edit_mode}
    class:shadow-xl={hovering && !link_edit_mode}
    class:variant-glass-surface={hovering && !link_edit_mode}
    on:mouseenter={() => {
        hovering = true;
    }}
    on:mouseleave={() => {hovering = false;}}
>
    <div class="relative m-0 flex w-full min-w-0 items-center justify-between whitespace-nowrap gap-0.5">
        <div class="w-full flex-col">
            <div class="flex h-12 w-full items-center">
                <a
                    href={link.url}
                    target="_blank"
                    class="m-0 flex h-full w-full min-w-0 select-text items-center justify-between gap-2 overflow-hidden truncate whitespace-nowrap p-2 pr-0 ring-primary-500 fade-right"
                    style="color: #f0f0f0; text-decoration: none;"
                    data-sveltekit-preload-data="off"
                >
                    <!-- favicon -->
                    <img class="h-5 w-5 select-none justify-self-start icon" src={favicon_src} alt="favicon" />
                    <!-- title -->
                    <div
                        title={link.url}
                        class="text-2xl"
                        class:text-primary-400={hovering && link.name.length !== 0}
                        class:underline={hovering && link.name.length !== 0}
                        class:text-secondary-100={hovering}
                        class:select-none={link.name.length !== 0}
                        class:select-all={link.name.length === 0}
                    >
                        {link.name.length !== 0 ? link.name : link.url}
                    </div>
                    <!-- link -->
                    <div class="grow overflow-hidden" class:link={!hovering} title={link.url}>
                        <i
                            class="w-full select-all overflow-hidden text-ellipsis text-sm opacity-50 text-secondary-100"
                            class:hidden={link.name.length === 0}
                            class:opacity-70={hovering}
                            class:underline={hovering}
                        >
                            {link.url}
                        </i>
                    </div>
                </a>
                <div class="flex items-center justify-center gap-2" class:hidden={!link_edit_mode}>
                    <button
                        on:click={discard_changes}
                        type="button"
                        class="h-10 self-center rounded-lg btn variant-ringed hover:variant-glass-warning"
                    >
                        Cancel
                    </button>
                    <button
                        on:click={save_changes}
                        type="button"
                        class="h-10 rounded-lg btn variant-glass-success hover:variant-ringed-success"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
        <!-- Buttons - invisible if LINK row is being edited. -->
        <div class="absolute top-1/2 right-0 z-10 flex h-full -translate-y-1/2 transform" class:hidden={link_edit_mode}>
            <div class="h-full w-full">
                <!-- bg-surface-900" class:bg-surface-800={hovering} /> -->
                <div class="flex h-full gap-3 rounded-r pr-4">
                    <!-- bg-surface-900" class:bg-surface-800={hovering}> -->
                    {#if true} <!-- Client can always edit their own list -->
                        <!-- Delete button -->
                        <button
                            class="hidden pl-2 text-error-400 fa-solid fa-trash hover:text-primary-500 sm:block"
                            class:hidden={!editing_link}
                            class:block={editing_link}
                            class:sm:invisible={!hovering}
                            on:click={delete_confirm}
                        />
                        <!-- Edit button -->
                        <button
                            class="hidden fa-solid fa-edit hover:text-primary-500 sm:block"
                            class:block={editing_link}
                            class:hidden={!editing_link}
                            class:sm:invisible={!hovering}
                            on:click={enter_edit_mode}
                        />
                    {/if}
                    <button
                        class="fa-solid fa-clone hover:text-primary-500"
                        use:clipboard={link.url}
                        on:click={copyHandler}
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- edit mode -->
    {#if link_edit_mode}
        <div class="flex w-full flex-col gap-2 p-2">
            <div class="flex items-center gap-1">
                <input
                    class="h-10 w-full rounded-lg input mr-0.5"
                    title="link text"
                    type="text"
                    placeholder="Title..."
                    bind:value={link.name}
                    bind:this={name_input}
                    use:catchEnter
                    on:submit={submit_changes}
                />
            </div>
            <input
                class="rounded-lg input"
                title="link text"
                type="text"
                placeholder="Your link..."
                bind:value={link.url}
                use:catchEnter
                on:submit={submit_changes}
            />
            <!-- Editing description -->
            <div class="w-full">
                <textarea
                    class="rounded textarea focus:ring-3"
                    bind:value={link.description}
                    placeholder="Description..."
                    use:catchEnter
                    on:submit={submit_changes}
                />
            </div>
        </div>
    {:else if link.description}
        <!-- Normal description -->
        <a
            href={link.url}
            target="_blank"
            style="color: #f0f0f0; text-decoration: none;"
            data-sveltekit-preload-data="off"
            class="mr-5 ml-5 cursor-pointer select-none pb-2 text-sm font-light tracking-wider sm:mr-12 sm:ml-12 sm:text-justify sm:text-base"
        >{link.description}</a
        >
    {/if}
</div>

<style>
  .fade-right {
    --mask: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 1) 0,
                    rgba(0, 0, 0, 1) calc(100% - 100px),
                    rgba(0, 0, 0, 0) calc(100% - 45px),
                    rgba(0, 0, 0, 0) 0
    ) 100% 50% / 100% 100% repeat-x;
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }

  .fade-right-strong {
    --mask: linear-gradient(
                    to right,
                    rgba(0, 0, 0, 1) 0,
                    rgba(0, 0, 0, 1) calc(100% - 130px),
                    rgba(0, 0, 0, 0) calc(100% - 75px),
                    rgba(0, 0, 0, 0) 0
    ) 100% 50% / 100% 100% repeat-x;
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }

  .fade_left {
    --mask: linear-gradient(
                    to left,
                    rgba(0, 0, 0, 1) 0,
                    rgba(0, 0, 0, 1) 20%,
                    rgba(0, 0, 0, 0) 100%,
                    rgba(0, 0, 0, 0) 0
    ) 100% 50% / 100% 100% repeat-x;
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }
</style>
