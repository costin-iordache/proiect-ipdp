export interface SubscriptionResponseSuccess {
    success: boolean;
    message: string;
    subscriptionId?: number;
}

export interface SubscriptionResponseError {
    error: string;
}

export type SubscriptionResponse = SubscriptionResponseSuccess | SubscriptionResponseError;
