// components/MySubscriptions.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchSubscriptions } from "@/backend/subs";

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

export default function MySubscriptions() {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchSubscriptions(setLoading, setError, setSubscriptions);
	}, []);

	if (loading) {
		return (
			<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
				Loading subscriptions...
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
				Error loading subscriptions: {error}
			</div>
		);
	}

	const activeCount = subscriptions.length;
	const displayedSubscriptions = subscriptions.slice(0, 5);

	return (
		<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
			<h3 className="text-lg font-semibold mb-2">
				{activeCount} active subscription{activeCount !== 1 && "s"}
			</h3>
			{displayedSubscriptions.map((sub) => (
				<div
					key={sub.id}
					className="grid grid-cols-3 items-center py-2 border-b border-gray-700 last:border-b-0"
				>
					<span className="justify-self-start">{sub.platform}</span>
					<span className="flex items-center justify-center text-sm text-purple-300 h-8">
						{new Date(sub.billing_date) < new Date() ? "Due" : "Upcoming"}
					</span>
					<span className="justify-self-end text-sm text-purple-300">
						{new Date(sub.billing_date).toDateString()}
					</span>
				</div>
			))}
			<button
				className="mt-4 bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-500"
				onClick={() => router.push("home/all-subscriptions")}
			>
				View all subscriptions
			</button>
		</div>
	);
}
