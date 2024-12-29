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
    public static get(): CancelablePromise<any> {
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
    public static sessionGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/session',
        });
    }
    /**
     * Healthcheck
     * @returns any Successful Response
     * @throws ApiError
     */
    public static healthcheckGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/healthcheck',
        });
    }
    /**
     * Debug
     * @returns any Successful Response
     * @throws ApiError
     */
    public static debugGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/debug',
        });
    }
    /**
     * User Test
     * @returns any Successful Response
     * @throws ApiError
     */
    public static userTestGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<(AccountInfo | null)> {
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
