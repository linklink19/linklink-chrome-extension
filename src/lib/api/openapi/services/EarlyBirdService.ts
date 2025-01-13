/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EarlyBirdInfo } from '../models/EarlyBirdInfo';
import type { PaddleInfo } from '../models/PaddleInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EarlyBirdService {
    /**
     *  Get Early Bird Info
     * Returns the number of early bird tickets available and the price.
     * @returns EarlyBirdInfo Successful Response
     * @throws ApiError
     */
    public static earlyBirdEarlyBirdInfoGet(): CancelablePromise<EarlyBirdInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/early-bird/early-bird-info',
        });
    }
    /**
     *  Get Paddle Customer Details
     * Requires existing paddle customer id, either here or in paddle.
     * @returns PaddleInfo Successful Response
     * @throws ApiError
     */
    public static earlyBirdPaddleInfoGet({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<PaddleInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/early-bird/paddle-info',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     *  Check Purchase
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public static earlyBirdCheckPurchasePost({
        authToken,
    }: {
        authToken?: (string | null),
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/early-bird/check-purchase',
            cookies: {
                'auth_token': authToken,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
