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
