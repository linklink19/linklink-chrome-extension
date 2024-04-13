/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInfo } from '../models/AccountInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Homepage
     * @returns any Successful Response
     * @throws ApiError
     */
    public static homepageGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Session
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sessionSessionGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/session',
        });
    }
    /**
     * User Test
     * @param authToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static userTestUserTestGet(
        authToken?: (string | null),
    ): CancelablePromise<(AccountInfo | null)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user-test',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
