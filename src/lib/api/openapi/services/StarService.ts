/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StarService {
    /**
     *  Star
     * @param liliId
     * @param authToken
     * @returns number Successful Response
     * @throws ApiError
     */
    public static starStarPost(
        liliId: string,
        authToken?: (string | null),
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/star/',
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
     *  Unstar
     * @param liliId
     * @param authToken
     * @returns number Successful Response
     * @throws ApiError
     */
    public static unstarStarDelete(
        liliId: string,
        authToken?: (string | null),
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/star/',
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
}
