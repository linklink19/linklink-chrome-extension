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
    public static testRedirectGet(): CancelablePromise<any> {
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
    public static testStrResponseGet(): CancelablePromise<any> {
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
    public static testInternalServerErrorGet(): CancelablePromise<any> {
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
    public static testNotFoundGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/not-found',
        });
    }
    /**
     * Set Cookie
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testSetCookiePost({
        customStr,
        secure = true,
        httponly = true,
    }: {
        customStr?: (string | null),
        secure?: boolean,
        httponly?: boolean,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/set-cookie',
            query: {
                'custom_str': customStr,
                'secure': secure,
                'httponly': httponly,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Cookie
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testGetCookieGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/get-cookie',
        });
    }
}
