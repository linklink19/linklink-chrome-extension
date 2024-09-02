/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInfo } from '../models/AccountInfo';
import type { AuthProviderResponse } from '../models/AuthProviderResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Get Login Url
     * @returns string Successful Response
     * @throws ApiError
     */
    public static authGoogleLoginGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/google/login',
        });
    }
    /**
     * Verify Authorization
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static authGoogleAuthPost({
        requestBody,
    }: {
        requestBody: AuthProviderResponse,
    }): CancelablePromise<AccountInfo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google/auth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Login Url
     * @returns string Successful Response
     * @throws ApiError
     */
    public static authGithubLoginGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/github/login',
        });
    }
    /**
     * Verify Authorization
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static authGithubAuthPost({
        requestBody,
    }: {
        requestBody: AuthProviderResponse,
    }): CancelablePromise<AccountInfo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/github/auth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Check Auth
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authCheckAuthGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<(AccountInfo | null)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/check_auth',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Refresh Tokens
     * Refreshes the access and refresh token cookies, if it's a good idea.
     *
     * This endpoint does not return anything nor throw errors, it just refreshes the cookies if relevant.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authRefreshTokensPost({
        refreshToken,
        authToken,
    }: {
        refreshToken?: (string | null),
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh-tokens',
            cookies: {
                'refresh_token': refreshToken,
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Expire Auth
     * Dev endpoint to expire the auth token.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authExpireAuthPost({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/expire-auth',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Expire All
     * Dev endpoint to expire all tokens.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authExpireAllPost({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/expire-all',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
