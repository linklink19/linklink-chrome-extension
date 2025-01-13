/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInfo } from '../models/AccountInfo';
import type { AccountUpdate } from '../models/AccountUpdate';
import type { TransferTarget } from '../models/TransferTarget';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountService {
    /**
     *  Read
     * Get the user editable parts of an account.
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static accountDetailsGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<AccountInfo> {
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
     * @returns AccountInfo Successful Response
     * @throws ApiError
     */
    public static accountChangeDetailsPost({
        requestBody,
        authToken,
    }: {
        requestBody: AccountUpdate,
        authToken?: (string | null),
    }): CancelablePromise<AccountInfo> {
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
     * @returns any Successful Response
     * @throws ApiError
     */
    public static accountDeleteDelete({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<any> {
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
    /**
     *  Transfer Target
     * Get the target account for transfer.
     * @returns TransferTarget Successful Response
     * @throws ApiError
     */
    public static accountTransferTargetGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<TransferTarget> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/transfer-target',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Transfer
     * Transfer current account TO other account, only works when emails are the same.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static accountTransferGet({
        otherAccountId,
        authToken,
    }: {
        otherAccountId: string,
        authToken?: (string | null),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/transfer',
            cookies: {
                'auth_token': authToken,
            },
            query: {
                'other_account_id': otherAccountId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
