/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TransferTarget = {
    account_id: string;
    account_name: string;
    account_type: TransferTarget.account_type;
};
export namespace TransferTarget {
    export enum account_type {
        GITHUB = 'github',
        GOOGLE = 'google',
    }
}

