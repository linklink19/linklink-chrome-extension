<script lang="ts">
    import { WEBSITE_URL } from '$lib/constants';
    import { account_info_store, client_settings, client_status } from '$lib/stores';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { SearchService, type NameRecord } from '$lib/api/openapi';
    $: target_url = `${WEBSITE_URL}/lili/${$client_settings.target_lili?.id ?? $account_info_store!.workspace_id}`;

    let search_field: HTMLInputElement;
    const toggle_list_selection = () => {
        $client_status.show_list_selection = !$client_status.show_list_selection;
        if ($client_status.show_list_selection) {
            update_search_results();
            setTimeout(() => {
                search_field.focus();
            }, 100);
        }
    };

    function debounce(func: Function, timeout = 120) {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    let search_string = '';
    let search_results: NameRecord[] = [];

    const update_search_results = async () => {
        await SearchService.searchSearchOwnLiliNamesGet(search_string).then((res) => {
            search_results = res;
        });
    };
    const process_change = debounce(update_search_results);

    const select_list = (name_record: NameRecord) => {
        $client_settings.target_lili = name_record;
    };
</script>

<div class="flex flex-col">
    <div class="flex flex-grow variant-ghost rounded h-12 w-full justify-center items-center">
        <a
            class="h-full w-full flex grow items-center align-middle hover:bg-white hover:bg-opacity-5
            border-r-[1px] border-gray-500"
            href={target_url}
            target="_blank"
        >
            <i class="fas fa-up-right-from-square w-8 p-1 px-4"></i>
            <span class="pl-2">
                {$client_settings.target_lili?.name ?? 'Workspace'}
            </span>
        </a>
        <button
            class="btn flex justify-center items-center h-full p-2 hover:bg-white hover:bg-opacity-5"
            on:click={toggle_list_selection}
        >
            <div class="flex justify-center items-center">
                <i
                    class="fas h-full w-8"
                    class:fa-caret-down={!$client_status.show_list_selection}
                    class:fa-caret-up={$client_status.show_list_selection}
                >
                </i>
            </div>
        </button>
    </div>
    <!-- List Selection -->
    {#if $client_status.show_list_selection}
        <div
            class="flex flex-col gap-2 py-2"
            transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
        >
            <input
                type="text"
                class="h-12 w-full input rounded"
                placeholder="List Search..."
                bind:value={search_string}
                bind:this={search_field}
                on:keydown={process_change}
            />
            <div
                class="flex flex-col gap-2"
                transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
            >
                {#each search_results as name_record}
                    <button
                        class="btn flex flex-col h-12 align-middle justify-center p-2 rounded text-wrap"
                        class:variant-glass-surface={name_record.id !==
                            $client_settings.target_lili?.id}
                        class:variant-glass-success={name_record.id ===
                            $client_settings.target_lili?.id}
                        on:click={() => {
                            select_list(name_record);
                            toggle_list_selection();
                        }}
                    >
                        {name_record.name}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>
