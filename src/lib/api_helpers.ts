import { user_lilis } from '$lib/stores';
import { LiliService } from '$lib/api/openapi';

export let refresh_user_lilis = async () => {
    let new_user_lilis = await LiliService.liliGet({
        includePrivate: true,
        includeNonUserPublic: false,
        limit: 100
    });
    user_lilis.set(new_user_lilis);
    console.log('refreshed user lilis');
};
