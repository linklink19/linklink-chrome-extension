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
    public static getLoginUrlAuthGoogleLoginGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/google/login',
        });
    }
    /**
     * Verify Authorization
     * @param requestBody
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static verifyAuthorizationAuthGoogleAuthPost(
        requestBody: AuthProviderResponse,
    ): CancelablePromise<AccountInfo> {
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
    public static getLoginUrlAuthGithubLoginGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/github/login',
        });
    }
    /**
     * Verify Authorization
     * @param requestBody
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static verifyAuthorizationAuthGithubAuthPost(
        requestBody: AuthProviderResponse,
    ): CancelablePromise<AccountInfo> {
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
    public static logoutAuthLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Check Auth
     * @param authToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static checkAuthAuthCheckAuthGet(
        authToken?: (string | null),
    ): CancelablePromise<(AccountInfo | null)> {
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
     * Refreshes the access and refresh token cookies.
     * @param refreshToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static refreshTokensAuthRefreshTokensPost(
        refreshToken?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh-tokens',
            cookies: {
                'refresh_token': refreshToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Expire Auth
     * Dev endpoint to expire the auth token.
     * @param authToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static expireAuthAuthExpireAuthPost(
        authToken?: (string | null),
    ): CancelablePromise<any> {
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
     * @param authToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static expireAllAuthExpireAllPost(
        authToken?: (string | null),
    ): CancelablePromise<any> {
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
