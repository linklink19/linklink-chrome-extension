/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiliOutput } from '../models/LiliOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccessHistoryService {
    /**
     *  Post
     * @returns any Successful Response
     * @throws ApiError
     */
    public static accessHistoryLiliLiliIdPost({
        liliId,
        authToken,
    }: {
        liliId: string,
        authToken?: (string | null),
    }): CancelablePromise<any> {
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
     * @returns string Successful Response
     * @throws ApiError
     */
    public static accessHistoryLiliGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<Array<string>> {
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
    /**
     *  Get Access History Lilis
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static accessHistoryLilisGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<Array<LiliOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/access-history/lilis',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
