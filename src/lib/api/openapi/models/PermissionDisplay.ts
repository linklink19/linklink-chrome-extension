/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PermissionDisplay = {
    username: string;
    permission: PermissionDisplay.permission;
};
export namespace PermissionDisplay {
    export enum permission {
        OWNER = 'owner',
        ADMIN = 'admin',
        EDIT_PERMISSIONS = 'edit_permissions',
        EDIT = 'edit',
        VIEW = 'view',
    }
}

