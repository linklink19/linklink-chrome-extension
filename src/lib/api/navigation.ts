import { pinned_extension_page } from '$lib/stores';
import { goto } from '$app/navigation';

export let reset_to_home = () =>  {
    pinned_extension_page.set(null);
    goto('/');
}