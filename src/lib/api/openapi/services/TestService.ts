/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestService {
    /**
     * Redirect
     * @returns any Successful Response
     * @throws ApiError
     */
    public static redirectTestRedirectGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/redirect',
        });
    }
    /**
     * Str Response
     * @returns any Successful Response
     * @throws ApiError
     */
    public static strResponseTestStrResponseGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/str-response',
        });
    }
    /**
     * Internal Server Error
     * @returns any Successful Response
     * @throws ApiError
     */
    public static internalServerErrorTestInternalServerErrorGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/internal-server-error',
        });
    }
    /**
     * Not Found
     * @returns any Successful Response
     * @throws ApiError
     */
    public static notFoundTestNotFoundGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/not-found',
        });
    }
}
