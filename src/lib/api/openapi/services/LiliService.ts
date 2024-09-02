/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiliInfo } from '../models/LiliInfo';
import type { LiliInput } from '../models/LiliInput';
import type { LiliOutput } from '../models/LiliOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LiliService {
    /**
     *  Create
     * Create a new LinkLink.
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliPost({
        requestBody,
        authToken
    }: {
        requestBody: LiliInput;
        authToken?: string | null;
    }): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lili/',
            cookies: {
                auth_token: authToken
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Read
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliGet({
        includePrivate = true,
        includeNonUserPublic = true,
        bookmarkedOnly = false,
        limit = 9,
        offset,
        includeUserPublic = true,
        includeNonUserPrivate = false,
        authToken
    }: {
        includePrivate?: boolean;
        includeNonUserPublic?: boolean;
        bookmarkedOnly?: boolean;
        limit?: number;
        offset?: number;
        includeUserPublic?: boolean;
        includeNonUserPrivate?: boolean;
        authToken?: string | null;
    }): CancelablePromise<Array<LiliOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/',
            cookies: {
                auth_token: authToken
            },
            query: {
                include_private: includePrivate,
                include_non_user_public: includeNonUserPublic,
                bookmarked_only: bookmarkedOnly,
                limit: limit,
                offset: offset,
                include_user_public: includeUserPublic,
                include_non_user_private: includeNonUserPrivate
            },
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Update
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliPut({
        requestBody,
        ignoreLinks = false,
        authToken
    }: {
        requestBody: LiliInput;
        ignoreLinks?: boolean;
        authToken?: string | null;
    }): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/lili/',
            cookies: {
                auth_token: authToken
            },
            query: {
                ignore_links: ignoreLinks
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Read Random
     * Get a single random Linklink
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliRandomGet({
        authToken
    }: {
        authToken?: string | null;
    }): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/random',
            cookies: {
                auth_token: authToken
            },
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Read By Id
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliIdGet({
        id,
        authToken
    }: {
        id: string;
        authToken?: string | null;
    }): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/{id}',
            path: {
                id: id
            },
            cookies: {
                auth_token: authToken
            },
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Delete
     * @returns string Successful Response
     * @throws ApiError
     */
    public static liliIdDelete({
        id,
        authToken
    }: {
        id: string;
        authToken?: string | null;
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lili/{id}',
            path: {
                id: id
            },
            cookies: {
                auth_token: authToken
            },
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Get By Id
     * @returns LiliInfo Successful Response
     * @throws ApiError
     */
    public static liliInfoIdGet({
        id,
        authToken
    }: {
        id: string;
        authToken?: string | null;
    }): CancelablePromise<LiliInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/info/{id}',
            path: {
                id: id
            },
            cookies: {
                auth_token: authToken
            },
            errors: {
                422: `Validation Error`
            }
        });
    }
}
