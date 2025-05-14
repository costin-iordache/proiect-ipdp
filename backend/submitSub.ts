import { SubscriptionResponse, SubscriptionResponseError } from "@/types/subResponse";

export async function submitSub(
    platform: string,
    startDate: string,
    billingDate: string,
    frequency: string,
    price: string,
    currency: string,
    userId: number
): Promise<{ response?: Response; data?: SubscriptionResponse; error?: string }> {
    try {
        const bodyParams = new URLSearchParams({
            platform,
            startDate: startDate,
            billingDate: billingDate,
            frequency,
            price,
            currency,
            userId: userId.toString()
        });

        const response = await fetch("http://ipdp.local/submitSub.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: bodyParams.toString(),
        });

        const data: SubscriptionResponse = await response.json();

        if ("success" in data) {
            console.log("Subscription submitted successfully:", data);
        } else {
            if ("error" in data) {
                console.error("Subscription submission failed:", (data as SubscriptionResponseError).error);
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