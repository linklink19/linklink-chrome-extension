/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PermissionDisplay } from '../models/PermissionDisplay';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermissionsService {
    /**
     *  Set Permission
     * @returns any Successful Response
     * @throws ApiError
     */
    public static permissionsPost({
        liliId,
        targetUser,
        permission = 'view',
        authToken,
    }: {
        liliId: string,
        targetUser: string,
        permission?: 'owner' | 'admin' | 'edit_permissions' | 'edit' | 'view',
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/permissions/',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'lili_id': liliId,
                'target_user': targetUser,
                'permission': permission,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Get Permissions
     * @returns PermissionDisplay Successful Response
     * @throws ApiError
     */
    public static permissionsGet({
        liliId,
        authToken,
    }: {
        liliId: string,
        authToken?: (string | null),
    }): CancelablePromise<Array<PermissionDisplay>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/permissions/',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'lili_id': liliId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Delete Permission
     * @returns any Successful Response
     * @throws ApiError
     */
    public static permissionsDelete({
        liliId,
        targetUser,
        authToken,
    }: {
        liliId: string,
        targetUser: string,
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/permissions/',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'lili_id': liliId,
                'target_user': targetUser,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Get Permission
     * @returns any Successful Response
     * @throws ApiError
     */
    public static permissionsLiliIdGet({
        liliId,
        authToken,
    }: {
        liliId: string,
        authToken?: (string | null),
    }): CancelablePromise<('owner' | 'admin' | 'edit_permissions' | 'edit' | 'view' | null)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/permissions/{lili_id}',
            path: {
                'lili_id': liliId,
            },
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Get
     * @returns number Successful Response
     * @throws ApiError
     */
    public static permissionsPermissionsHierarchyGet(): CancelablePromise<Record<string, number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/permissions/permissions-hierarchy',
        });
    }
}
