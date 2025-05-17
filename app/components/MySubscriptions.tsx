// components/MySubscriptions.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Subscription {
	id: number;
	user_id: number;
	platform: string;
	start_date: string;
	billing_date: string;
	billing_frequency: string;
	price: string;
	currency: string;
}

const predefinedSubscriptions = [
	{
		id: 1,
		user_id: 1,
		platform: "Netflix",
		start_date: "2023-01-01",
		billing_date: "2023-02-01",
		billing_frequency: "monthly",
		price: "9.99",
		currency: "USD",
	},
	{
		id: 2,
		user_id: 1,
		platform: "Spotify",
		start_date: "2023-01-15",
		billing_date: "2023-02-15",
		billing_frequency: "monthly",
		price: "4.99",
		currency: "USD",
	},
	{
		id: 3,
		user_id: 1,
		platform: "YouTube Premium",
		start_date: "2023-01-20",
		billing_date: "2023-02-20",
		billing_frequency: "monthly",
		price: "11.99",
		currency: "USD",
	},
];

export default function MySubscriptions() {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const router = useRouter();
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setSubscriptions(predefinedSubscriptions);
		// const fetchSubscriptions = async () => {
		// 	setLoading(true);
		// 	setError(null);
		// 	try {
		// 		const authData = localStorage.getItem("authData");
		// 		if (!authData) {
		// 			setError("User not logged in.");
		// 			setLoading(false);
		// 			return;
		// 		}
		// 		const userId = parseInt(JSON.parse(authData).userId);
		// 		if (isNaN(userId)) {
		// 			setError("Invalid user ID.");
		// 			setLoading(false);
		// 			return;
		// 		}

		// 		const response = await fetch(
		// 			`http://ipdp.local/getSubs.php?userId=${userId}`
		// 		);

		// 		if (!response.ok) {
		// 			throw new Error(`HTTP error! status: ${response.status}`);
		// 		}

		// 		const data = await response.json();

		// 		if (data.success) {
		// 			setSubscriptions(data.subscriptions);
		// 		} else {
		// 			setError(data.error || "Failed to fetch subscriptions.");
		// 		}
		// 	} catch (error) {
		// 		setError(`Failed to fetch subscriptions: ${error}`);
		// 	} finally {
		// 		setLoading(false);
		// 	}
	// 	};

	// 	fetchSubscriptions();
	}, []);

	// if (loading) {
	// 	return (
	// 		<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
	// 			Loading subscriptions...
	// 		</div>
	// 	);
	// }

	// if (error) {
	// 	return (
	// 		<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
	// 			Error loading subscriptions: {error}
	// 		</div>
	// 	);
	// }

	const activeCount = subscriptions.length;

	return (
		<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
			<h3 className="text-lg font-semibold mb-2">{activeCount} active</h3>
			{subscriptions.map((sub) => (
				<div
					key={sub.id}
					className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
				>
					<span>{sub.platform}</span>
					<span className="text-sm text-purple-300">
						{new Date(sub.billing_date) < new Date() ? "Due" : "Upcoming"}
					</span>
					<span className="text-sm text-purple-300">
						{new Date(sub.billing_date).toDateString()}
					</span>
				</div>
			))}
			<button className="mt-4 bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-500" onClick={() => router.push("home/all-subscriptions")}>
				View all subscriptions
			</button>
		</div>
	);
}
