/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookmarkService {
    /**
     *  Set Bookmark
     * @returns number Successful Response
     * @throws ApiError
     */
    public static bookmarkPost({
        liliId,
        bookmark,
        authToken,
    }: {
        liliId: string,
        bookmark: boolean,
        authToken?: (string | null),
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookmark/',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'lili_id': liliId,
                'bookmark': bookmark,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
