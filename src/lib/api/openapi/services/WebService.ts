/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LinkAutoFill } from '../models/LinkAutoFill';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebService {
    /**
     * Get Title
     * @returns string Successful Response
     * @throws ApiError
     */
    public static webInfoTitleGet({
        url,
    }: {
        url: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/web/info/title',
            query: {
                'url': url,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Link Autofill
     * @returns LinkAutoFill Successful Response
     * @throws ApiError
     */
    public static webInfoAutofillGet({
        url,
    }: {
        url: string,
    }): CancelablePromise<LinkAutoFill> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/web/info/autofill',
            query: {
                'url': url,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
