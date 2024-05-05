import { writable, type Writable } from 'svelte/store';
import type { AccountInfo } from '$lib/api/openapi';
import { localStorageStore } from '@skeletonlabs/skeleton';

// Auth / Account
export const account_info_store: Writable<AccountInfo | null> = localStorageStore('account_info', null);

export enum AuthStatus {
    unknown,
    logged_out,
    refreshing,
    logged_in
}
export const auth_status: Writable<AuthStatus> = writable(AuthStatus.unknown);

export type ClientStatus = {
    saving_all_tabs: boolean;
};
const defaultClientStatus: ClientStatus = {
    saving_all_tabs: false,
};
export const client_status: Writable<ClientStatus> = writable(defaultClientStatus);


export type ClientSettings = {
    target_lili_id?: string;
}
const defaultClientSettings: ClientSettings = {
    target_lili_id: undefined,
};
export const client_settings: Writable<ClientSettings> = localStorageStore('extension_client_settings', defaultClientSettings);
