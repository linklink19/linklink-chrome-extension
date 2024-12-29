/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiliOutput } from '../models/LiliOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiService {
    /**
     *  Categorise
     * @returns LiliOutput Successful Response
     * @throws ApiError
     */
    public static aiCategorisePost({
        liliId,
        authToken,
    }: {
        liliId: string,
        authToken?: (string | null),
    }): CancelablePromise<LiliOutput> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/categorise',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'lili_id': liliId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
