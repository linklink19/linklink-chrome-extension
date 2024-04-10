/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Link } from './Link';

export type LiliOutput = {
    name: string;
    description?: (string | null);
    links: Array<Link>;
    public_access: boolean;
    id: string;
    edited_at: string;
    created_at: string;
    updated_at: string;
    owner: string;
    profile_picture_url: (string | null);
    starred: boolean;
    n_stars: number;
};

