/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Link } from '../models/Link';
import type { LiPosition } from '../models/LiPosition';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LinkService {
    /**
     *  Create
     * @returns Link Successful Response
     * @throws ApiError
     */
    public static linkPost({
        liliId,
        requestBody,
        authToken
    }: {
        liliId: string;
        requestBody: Array<Link>;
        authToken?: string | null;
    }): CancelablePromise<Array<Link>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/link/',
            cookies: {
                auth_token: authToken
            },
            query: {
                lili_id: liliId
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`
            }
        });
    }
    /**
     *  Update
     * @returns Link Successful Response
     * @throws ApiError
     */
    public static linkPut({
        requestBody,
        authToken
    }: {
        requestBody: Link;
        authToken?: string | null;
    }): CancelablePromise<Link> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/link/',
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
     *  Delete
     * @returns string Successful Response
     * @throws ApiError
     */
    public static linkDelete({
        requestBody,
        authToken
    }: {
        requestBody: Array<string>;
        authToken?: string | null;
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/link/',
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
     *  Set
     * @returns any Successful Response
     * @throws ApiError
     */
    public static linkOrderPatch({
        liliId,
        requestBody,
        authToken
    }: {
        liliId: string;
        requestBody: Array<LiPosition>;
        authToken?: string | null;
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/link/order',
            cookies: {
                auth_token: authToken
            },
            query: {
                lili_id: liliId
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`
            }
        });
    }
}
