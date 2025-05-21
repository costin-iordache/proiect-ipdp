// components/MonthOverview.tsx
"use client";
import { useState, useEffect } from "react";
import { fetchSubscriptions } from "@/backend/subs";
import { Subscription } from "@/types/subResponse";

export default function MonthOverview() {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
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

	const monthCounts: { [month: string]: number } = {};
	subscriptions.forEach((sub) => {
		const date = new Date(sub.billing_date);
		const month = date.toLocaleString("default", { month: "short" });
		monthCounts[month] = (monthCounts[month] || 0) + 1;
	});

	const monthsWithSubs = Object.entries(monthCounts);

	return (
		<div className="text-white bg-[#1e1b2e] p-4 rounded-2xl shadow">
			<h4 className="text-sm mb-2 font-semibold">Year Overview</h4>
			<div className="grid grid-cols-3 gap-2">
				{monthsWithSubs.map(([month, count]) => (
					<div key={month} className="text-center p-2 bg-purple-700 rounded-md">
						<div className="text-sm">{month}</div>
						<div className="text-lg font-bold">{count}</div>
					</div>
				))}
			</div>
		</div>
	);
}
