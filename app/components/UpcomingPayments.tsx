// components/UpcomingPayments.tsx
"use client";
import { useState, useEffect } from "react";
import { fetchSubscriptions } from "@/backend/subs";
import { Subscription } from "@/types/subResponse";

export default function UpcomingPayments() {
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

	const now = new Date();

	let upcomingThisMonth = 0;
	let dueCount = 0;
	let upcomingIn3Days = 0;

	subscriptions.forEach((sub) => {
		const billingDate = new Date(sub.billing_date);
		if (
			billingDate.getFullYear() === now.getFullYear() &&
			billingDate.getMonth() === now.getMonth()
		) {
			upcomingThisMonth++;
		}
		if (billingDate < now) {
			dueCount++;
		}
		const diffDays = Math.ceil(
			(billingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
		);
		if (diffDays >= 0 && diffDays <= 3) {
			upcomingIn3Days++;
		}
	});

	return (
		<div className="bg-[#1e1b2e] text-white p-4 rounded-2xl">
			<h4 className="mb-3 font-semibold">Payments this month</h4>
			<div className="mb-4 flex flex-col gap-1">
				<span>
					<strong>{dueCount}</strong> due
				</span>
				<span>
					<strong>{upcomingIn3Days}</strong> upcoming in 3 days or less
				</span>
				<span>
					<strong>{upcomingThisMonth}</strong> upcoming
				</span>
			</div>
		</div>
	);
}
