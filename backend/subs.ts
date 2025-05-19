import {
	SubmitSubscriptionResponse,
	SubmitSubscriptionResponseError,
	FetchSubscriptionsResponse,
	DeleteSubscriptionResponse,
	FetchSubscriptionsResponseSuccess,
	FetchSubscriptionsResponseError,
	EditSubscriptionResponse,
	EditSubscriptionParams,
} from "@/types/subResponse";

export async function submitSub(
	platform: string,
	startDate: string,
	billingDate: string,
	frequency: string,
	price: string,
	currency: string,
	userId: number
): Promise<{
	response?: Response;
	data?: SubmitSubscriptionResponse;
	error?: string;
}> {
	try {
		const bodyParams = new URLSearchParams({
			platform,
			startDate: startDate,
			billingDate: billingDate,
			frequency,
			price,
			currency,
			userId: userId.toString(),
		});

		const response = await fetch("http://ipdp.local/submitSub.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: bodyParams.toString(),
		});

		const data: SubmitSubscriptionResponse = await response.json();

		if ("success" in data) {
			console.log("Subscription submitted successfully:", data);
		} else {
			if ("error" in data) {
				console.error(
					"Subscription submission failed:",
					(data as SubmitSubscriptionResponseError).error
				);
			} else {
				console.error("Subscription submission failed: Something went wrong");
			}
		}

		return { response, data };
	} catch (error) {
		console.error("Error during fetch in submitSub:", error);
		return { error: "Failed to connect to the server" };
	}
}

export async function fetchSubscriptions(
	setLoading: (loading: boolean) => void,
	setError: (error: string | null) => void,
	setSubscriptions: (
		subscriptions: {
			id: number;
			user_id: number;
			platform: string;
			start_date: string;
			billing_date: string;
			billing_frequency: string;
			price: string;
			currency: string;
		}[]
	) => void
): Promise<{
	response?: Response;
	data?: FetchSubscriptionsResponse;
	error?: string;
}> {
	setLoading(true);
	setError(null);
	try {
		const authData = localStorage.getItem("authData");
		if (!authData) {
			setError("User not logged in.");
			setLoading(false);
			return { error: "User not logged in." };
		}
		const userId = parseInt(JSON.parse(authData).userId);
		if (isNaN(userId)) {
			setError("Invalid user ID.");
			setLoading(false);
			return { error: "Invalid user ID." };
		}

		const response = await fetch(
			`http://ipdp.local/getSubs.php?userId=${userId}`
		);

		if (!response.ok) {
			const errorMessage = `HTTP error! status: ${response.status}`;
			throw new Error(errorMessage);
		}

		const data: FetchSubscriptionsResponse = await response.json();

		if (data.success) {
			const successData = data as FetchSubscriptionsResponseSuccess;
			setSubscriptions(
				successData.subscriptions.sort(
					(
						a: {
							id: number;
							user_id: number;
							platform: string;
							start_date: string;
							billing_date: string;
							billing_frequency: string;
							price: string;
							currency: string;
						},
						b: {
							id: number;
							user_id: number;
							platform: string;
							start_date: string;
							billing_date: string;
							billing_frequency: string;
							price: string;
							currency: string;
						}
					) => {
						return (
							new Date(a.billing_date).getTime() -
							new Date(b.billing_date).getTime()
						);
					}
				)
			);
			return { response, data };
		} else {
			const errorData = data as FetchSubscriptionsResponseError;
			setError(errorData.error || "Failed to fetch subscriptions.");
			return { response, data, error: errorData.error };
		}
	} catch (error) {
		const errorMessage = `Failed to fetch subscriptions: ${error}`;
		setError(errorMessage);
		return { error: errorMessage };
	} finally {
		setLoading(false);
	}
}

export async function handleDeleteSub(
	subId: number,
	setLoading: (loading: boolean) => void,
	setError: (error: string | null) => void
): Promise<{
	response?: Response;
	data?: DeleteSubscriptionResponse;
	error?: string;
}> {
	setLoading(true);
	setError(null);
	try {
		const response = await fetch(
			`http://ipdp.local/deleteSub.php?subId=${subId}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.success) {
			console.log("Subscription deleted successfully:", data);
			return { response, data };
		} else {
			const errorMessage = data.error || "Failed to delete subscription.";
			setError(errorMessage);
			return { response, data, error: errorMessage };
		}
	} catch (error) {
		const errorMessage = `Failed to delete subscription: ${error}`;
		setError(errorMessage);
		return { error: errorMessage };
	} finally {
		setLoading(false);
	}
}

export const editSubscription = async (
	subscriptionData: EditSubscriptionParams
): Promise<{
	response?: Response;
	data?: EditSubscriptionResponse;
	error?: string;
}> => {
	try {
		const response = await fetch("http://ipdp.local/editSub.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(subscriptionData),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: EditSubscriptionResponse = await response.json();
		return { response, data };
	} catch (error) {
		const errorMessage = `Failed to edit subscription: ${error}`;
		return { error: errorMessage };
	}
};
