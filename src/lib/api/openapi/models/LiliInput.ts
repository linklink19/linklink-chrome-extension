/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Link } from './Link';

export type LiliInput = {
    name: string;
    description?: (string | null);
    links: Array<Link>;
    public_access: boolean;
    id: string;
    edited_at: string;
    created_at: string;
    updated_at: string;
};

