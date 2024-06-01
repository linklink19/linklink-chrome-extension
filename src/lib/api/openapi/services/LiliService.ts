/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiliCreate } from '../models/LiliCreate';
import type { LiliInfo } from '../models/LiliInfo';
import type { LiliInput } from '../models/LiliInput';
import type { LiliOutput } from '../models/LiliOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LiliService {
    /**
     *  Create
     * @param requestBody
     * @param authToken
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliPost(
        requestBody: LiliCreate,
        authToken?: (string | null),
    ): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lili/',
            cookies: {
                'auth_token': authToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Read
     * @param includePrivate
     * @param includeNonUserPublic
     * @param starredOnly
     * @param limit
     * @param offset
     * @param includeUserPublic
     * @param authToken
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliGet(
        includePrivate: boolean = true,
        includeNonUserPublic: boolean = true,
        starredOnly: boolean = false,
        limit: number = 9,
        offset?: number,
        includeUserPublic: boolean = true,
        authToken?: (string | null),
    ): CancelablePromise<Array<LiliOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'include_private': includePrivate,
                'include_non_user_public': includeNonUserPublic,
                'starred_only': starredOnly,
                'limit': limit,
                'offset': offset,
                'include_user_public': includeUserPublic,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Update
     * @param requestBody
     * @param authToken
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliPut(
        requestBody: LiliInput,
        authToken?: (string | null),
    ): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/lili/',
            cookies: {
                'auth_token': authToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Delete
     * @param requestBody
     * @param authToken
     * @returns string Successful Response
     * @throws ApiError
     */
    public static liliDelete(
        requestBody: Array<string>,
        authToken?: (string | null),
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lili/',
            cookies: {
                'auth_token': authToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Read By Id
     * @param id
     * @param authToken
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static liliIdGet(
        id: string,
        authToken?: (string | null),
    ): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/{id}',
            path: {
                'id': id,
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
     *  Get By Id
     * @param id
     * @param authToken
     * @returns LiliInfo Successful Response
     * @throws ApiError
     */
    public static liliInfoIdGet(
        id: string,
        authToken?: (string | null),
    ): CancelablePromise<LiliInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/info/{id}',
            path: {
                'id': id,
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
     *  Read
     * @param includePrivate
     * @param includeNonUserPublic
     * @param limit
     * @param offset
     * @param authToken
     * @returns LiliInfo Successful Response
     * @throws ApiError
     */
    public static liliInfoGet(
        includePrivate: boolean = true,
        includeNonUserPublic: boolean = true,
        limit: number = 9,
        offset?: number,
        authToken?: (string | null),
    ): CancelablePromise<Array<LiliInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lili/info',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'include_private': includePrivate,
                'include_non_user_public': includeNonUserPublic,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
