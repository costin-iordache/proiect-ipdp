"use client";

// import Modal from "@/app/components/Modal";
// import SubForm from "@/app/components/SubForm";
import { useState, useEffect } from "react";
import { fetchSubscriptions, handleDeleteSub } from "@/backend/subs";

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

export default function AllSubscriptions() {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentSub, setCurrentSub] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	console.log(isOpen, currentSub);

	async function handleDelete(subId: number) {
		handleDeleteSub(subId, setLoading, setError);
		fetchSubscriptions(setLoading, setError, setSubscriptions);
	}

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

	return (
		<div className="min-h-screen text-gray-800 p-6">
			<div className="items-center mb-4 justify-center flex flex-col">
				<h1 className="text-3xl font-bold mb-4 justify-center">
					All Subscriptions
				</h1>
				<p className="mb-4">
					Here you can view and manage all your subscriptions. Click on the
					subscription name to edit or delete it.
				</p>
			</div>
			{activeCount === 0 && (
				<div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
					No active subscriptions.
				</div>
			)}
			{subscriptions.map((subscription) => (
				<div
					key={subscription.id}
					className="p-2 mb-3 backdrop-blur-md bg-white/30 border border-white/40 shadow-lg rounded-2xl p-4 text-gray-900"
				>
					<h2 className="text-lg font-semibold">{subscription.platform}</h2>
					<p>
						Start Date: {subscription.start_date} <br />
						Billing Date: {subscription.billing_date} <br />
						Frequency: {subscription.billing_frequency} <br />
						Price: {subscription.price} {subscription.currency}
					</p>
					<button
						className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
						onClick={() => {
							setCurrentSub(subscription.id);
							setIsOpen(true);
						}}
					>
						Edit
					</button>

					<button
						className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded"
						onClick={() => handleDelete(subscription.id)}
					>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}
