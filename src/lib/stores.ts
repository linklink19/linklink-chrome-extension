import { writable, type Writable } from 'svelte/store';
import type { AccountInfo, LiliInfo, LiliOutput } from './api/openapi';
import { localStorageStore, type DrawerStore } from '@skeletonlabs/skeleton';

interface Refreshable<T> extends Writable<T> {
    refresh: () => void;
    get: () => T;
}

function refreshable<T>(value: T): Refreshable<T> {
    const store = writable(value);
    let currentValue = value;

    // Subscribe to get the current value whenever it changes
    const unsubscribe = store.subscribe((value) => {
        currentValue = value;
    });

    return {
        set: store.set,
        update: store.update,
        subscribe: store.subscribe,
        refresh: () => {
            // Set the current value to itself, triggering an update
            store.set(currentValue);
        },
        get: () => {
            return currentValue;
        }
    };
}

// Auth / Account
export const account_info_store: Writable<AccountInfo | null> = localStorageStore('account_info', null);

export enum AuthStatus {
    unknown,
    logged_out,
    refreshing,
    logged_in
}

export const auth_status: Refreshable<AuthStatus> = refreshable(AuthStatus.unknown);

class LiliStatus {
    editing = false;
    active = false;
}

// --

// Current lili
export const current_lili_client_status: Refreshable<LiliStatus> = refreshable(new LiliStatus());
export const current_lili: Refreshable<LiliOutput> = refreshable({
    id: '',
    name: '',
    description: '',
    links: [],
    owner: '',
    profile_picture_url: null,
    public_access: false,
    edited_at: '',
    n_stars: 0,
    starred: false,
    created_at: '',
    updated_at: ''
});

export const current_lili_info: Refreshable<LiliInfo> = refreshable({
    id: '',
    name: '',
    description: '',
    n_links: 0,
    public_access: false,
    client_can_edit: false,
    edited_at: '',
    created_at: '',
    updated_at: '',
    owner: '',
    profile_picture_url: null
});

export const current_lilis_infos: Refreshable<LiliInfo[]> = refreshable([]);
export const savepoint_lili: Refreshable<LiliOutput> = refreshable({
    id: '',
    name: '',
    description: '',
    links: [],
    owner: '',
    profile_picture_url: null,
    edited_at: '',
    created_at: '',
    updated_at: '',
    public_access: false,
    starred: false,
    n_stars: 0
});
export const create_lili_savepoint = () => {
    savepoint_lili.set(current_lili.get());
};
export const restore_lili_savepoint = () => {
    current_lili.set(savepoint_lili.get());
};
// --

// Top bar
export const central_title: Refreshable<string | null> = refreshable(null);
export const search_string: Refreshable<string> = refreshable('');


export enum ActiveDrawer {
    none,
    lili,
    account,
}
export const active_drawer: Refreshable<ActiveDrawer> = refreshable(ActiveDrawer.none);

export const drawer_store: Refreshable<DrawerStore | null> = refreshable(null);
