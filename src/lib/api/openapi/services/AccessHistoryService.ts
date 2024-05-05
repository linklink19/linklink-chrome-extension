/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccessHistoryService {
    /**
     *  Post
     * @param liliId
     * @param authToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static postAccessHistoryLiliLiliIdPost(
        liliId: string,
        authToken?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/access-history/lili/{lili_id}',
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
     *  Read Access History
     * @param authToken
     * @returns string Successful Response
     * @throws ApiError
     */
    public static readAccessHistoryAccessHistoryLiliGet(
        authToken?: (string | null),
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/access-history/lili',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
