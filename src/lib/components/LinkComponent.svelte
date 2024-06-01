<script lang="ts">
    import { LinkService, type Link } from '$lib/api/openapi';

    import { alert_any_error, alert_quick } from '$lib/alerts';
    import { delete_link } from '$lib/lili_crud_helpers';
    import { current_lili_client_status, current_lili_info } from '$lib/stores';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { clipboard, popup } from '@skeletonlabs/skeleton';
    import { onMount, tick } from 'svelte';
    import { catchEnter } from './catch_enter_directive';

    export let link: Link;

    // callbacks
    let hovering = false;
    export const enter_edit_mode = () => {
        // close the thing
        setTimeout(async () => {
            link_edit_mode = true;
            await tick();
            name_input.focus();
            name_input.select();
        }, 100);
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
            alert_any_error('URL should not be empty');
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
        alert_quick('Copied - ' + link.url, 1800);
    }

    const strong_delete = async () => {
        delete_link(link.id);
    };

    const delete_confirm = async () => {
        if (confirm('Are you sure you want to delete this link?')) {
            delete_link(link.id);
        }
    };
</script>

<!-- Main -->
<div
    class="grid w-full m-0 max-w-full border-primary-500 text-xl box-border"
    on:mouseenter={() => {
        hovering = true;
    }}
    on:mouseleave={() => {hovering = false;}}
    class:shadow-xl={hovering && !link_edit_mode}
    class:variant-glass-surface={hovering && !link_edit_mode}
    class:rounded={hovering && !link_edit_mode}
    class:opacity-60={link.id.startsWith('unconfirmed')}
>
    <div class="flex items-center justify-between w-full gap-0.5 m-0 whitespace-nowrap min-w-0 relative">
        <div class="flex-col w-full">
            <div class="flex w-full h-12 items-center">
                <a
                    href={link.url}
                    class="flex items-center justify-between w-full gap-2 m-0 p-2 pr-0 whitespace-nowrap min-w-0 h-full ring-primary-500 overflow-hidden select-text truncate fade-right"
                    style="color: #f0f0f0; text-decoration: none;"
                    data-sveltekit-preload-data="off"
                >
                    <!-- favicon -->
                    <img class="icon h-5 w-5 select-none justify-self-start" src={favicon_src} alt="favicon" />
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
                            class="w-full overflow-hidden text-ellipsis text-sm opacity-50 text-secondary-100 select-all"
                            class:hidden={link.name.length === 0}
                            class:opacity-70={hovering}
                            class:underline={hovering}
                        >
                            {link.url}
                        </i>
                    </div>
                </a>
                <div class="flex gap-2 items-center justify-center" class:hidden={!link_edit_mode}>
                    <button
                        on:click={discard_changes}
                        type="button"
                        class="btn variant-ringed hover:variant-glass-warning rounded-lg self-center h-10"
                    >
                        Cancel
                    </button>
                    <button
                        on:click={save_changes}
                        type="button"
                        class="btn rounded-lg hover:variant-ringed-success variant-glass-success h-10"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
        <!-- Buttons - invisible if LINK row is being edited. -->
        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-full flex" class:hidden={link_edit_mode}>
            <div class="w-full h-full">
                <!-- bg-surface-900" class:bg-surface-800={hovering} /> -->
                <div class="flex h-full rounded-r pr-4 gap-3">
                    <!-- bg-surface-900" class:bg-surface-800={hovering}> -->
                    {#if $current_lili_info.client_can_edit}
                        <!-- Options button -->
                        <!-- Delete button -->
                        <button
                            class="text-error-400 fa-solid fa-trash hover:text-primary-500 pl-2 hidden sm:block"
                            class:hidden={!$current_lili_client_status.editing}
                            class:block={$current_lili_client_status.editing}
                            class:sm:invisible={!hovering}
                            on:click={delete_confirm}
                        />
                        <!-- Edit button -->
                        <button
                            class="fa-solid fa-edit hover:text-primary-500 hidden sm:block"
                            class:block={$current_lili_client_status.editing}
                            class:hidden={!$current_lili_client_status.editing}
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
        <div class="flex flex-col w-full gap-2 p-2">
            <div class="flex items-center gap-1">
                <input
                    class="input rounded-lg h-10 w-full mr-0.5"
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
                class="input rounded-lg"
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
                    class="textarea rounded focus:ring-3"
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
            style="color: #f0f0f0; text-decoration: none;"
            data-sveltekit-preload-data="off"
            class="ml-5 mr-5 sm:ml-12 sm:mr-12 pb-2 cursor-pointer select-none font-light tracking-wider sm:text-justify text-sm sm:text-base"
        >{link.description}</a
        >
    {/if}
</div>

<style lang="scss">
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
