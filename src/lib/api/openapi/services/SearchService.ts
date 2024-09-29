/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiliOutput } from '../models/LiliOutput';
import type { NameRecord } from '../models/NameRecord';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchService {
    /**
     *  Search
     * :return: list of lilis
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static searchGet({
        searchTerm = '',
        userOnly = false,
        authToken,
    }: {
        searchTerm?: string,
        userOnly?: boolean,
        authToken?: (string | null),
    }): CancelablePromise<Array<LiliOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'search_term': searchTerm,
                'user_only': userOnly,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Search
     * Used for extension.
     * @returns NameRecord Successful Response
     * @throws ApiError
     */
    public static searchOwnLiliNamesGet({
        searchTerm = '',
        authToken,
    }: {
        searchTerm?: string,
        authToken?: (string | null),
    }): CancelablePromise<Array<NameRecord>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/own-lili-names',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'search_term': searchTerm,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
