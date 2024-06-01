/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StarService {
    /**
     *  Set Star
     * @param liliId
     * @param star
     * @param authToken
     * @returns number Successful Response
     * @throws ApiError
     */
    public static starPost(
        liliId: string,
        star: boolean,
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
                'star': star,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
