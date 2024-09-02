/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * Set Featured Lili
     * @returns any Successful Response
     * @throws ApiError
     */
    public static adminFeaturedLiliPost({
        liliId,
        description,
        orderInShowcase,
        authToken,
    }: {
        liliId: string,
        description: string,
        orderInShowcase?: number,
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/featured-lili',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'lili_id': liliId,
                'description': description,
                'order_in_showcase': orderInShowcase,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Featured Lili
     * @returns any Successful Response
     * @throws ApiError
     */
    public static adminFeaturedLiliDelete({
        liliId,
        authToken,
    }: {
        liliId: string,
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/featured-lili',
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
     * Is Admin
     * Can only be accessed by admins.
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static adminIsAdminGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/is-admin',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
