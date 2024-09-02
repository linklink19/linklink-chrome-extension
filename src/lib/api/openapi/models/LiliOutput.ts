/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from './Link';
/**
 * Includes fields that cannot be edited by the user and fields that are specific to the user.
 */
export type LiliOutput = {
    id: string;
    name: string;
    description: string;
    links: Array<Link>;
    public_access: boolean;
    unlisted: boolean;
    owner: string;
    edited_at: string;
    created_at: string;
    updated_at: string;
    n_bookmarks: number;
    n_links: number;
    permission: LiliOutput.permission;
    permissions: Array<'owner' | 'admin' | 'edit_permissions' | 'edit' | 'view'>;
    bookmarked: boolean;
};
export namespace LiliOutput {
    export enum permission {
        OWNER = 'owner',
        ADMIN = 'admin',
        EDIT_PERMISSIONS = 'edit_permissions',
        EDIT = 'edit',
        VIEW = 'view',
    }
}

