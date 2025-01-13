/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaddleInfo = {
    paddle_environment: PaddleInfo.paddle_environment;
    customer_token: string;
    paddle_vendor_id: number;
    customer_id: string;
    customer_token_expires_at: string;
    price_id: string;
    paddle_public_key: string;
};
export namespace PaddleInfo {
    export enum paddle_environment {
        SANDBOX = 'sandbox',
        PRODUCTION = 'production',
    }
}

