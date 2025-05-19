export interface SubmitSubscriptionResponseSuccess {
	success: boolean;
	message: string;
	subscriptionId?: number;
}

export interface SubmitSubscriptionResponseError {
	error: string;
}

export type SubmitSubscriptionResponse =
	| SubmitSubscriptionResponseSuccess
	| SubmitSubscriptionResponseError;

export interface FetchSubscriptionsResponseSuccess {
	success: boolean;
	subscriptions: [];
}

export interface FetchSubscriptionsResponseError {
    success: boolean;
	error: string;
}

export type FetchSubscriptionsResponse =
	| FetchSubscriptionsResponseSuccess
	| FetchSubscriptionsResponseError;

export interface DeleteSubscriptionResponseSuccess {
	success: boolean;
	message?: string;
}
export interface DeleteSubscriptionResponseError {
    success: boolean;
    error: string;
}
export type DeleteSubscriptionResponse =
    | DeleteSubscriptionResponseSuccess
    | DeleteSubscriptionResponseError;

export interface EditSubscriptionResponseSuccess {
    success: true;
    message: string;
	updatedSubscription: Subscription;
}

export interface EditSubscriptionResponseError {
    error: string;
}

export type EditSubscriptionResponse = EditSubscriptionResponseSuccess | EditSubscriptionResponseError;

export interface EditSubscriptionParams {
    id: number;
    userId: number;
    platform: string;
    startDate: string;
    billingDate: string;
    billingFrequency: string;
    price: string;
    currency: string;
}
export interface Subscription {
    id: number;
    platform: string;
    start_date: string;
    billing_date: string;
    billing_frequency: string;
    price: string;
    currency: string;
    user_id: number;
}