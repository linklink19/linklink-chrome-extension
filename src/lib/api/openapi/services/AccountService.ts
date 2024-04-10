/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInfo } from '../models/AccountInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     *  Read
     * Get the user editable parts of an account.
     * @param authToken
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static readAccountDetailsGet(
        authToken?: (string | null),
    ): CancelablePromise<AccountInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/details',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     *  Update
     * Change the user editable parts of an account.
     * @param requestBody
     * @param authToken
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static updateAccountChangeDetailsPost(
        requestBody: AccountInfo,
        authToken?: (string | null),
    ): CancelablePromise<AccountInfo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/change_details',
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
     * Delete the user account.
     * @param authToken
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteAccountDeleteDelete(
        authToken?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/account/delete',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
