"use client";
import { useState, useEffect } from "react";
import { fetchSubscriptions, handleDeleteSub } from "@/backend/subs";
import Modal from "@/app/components/Modal";
import SubForm from "@/app/components/SubForm";
import EditSubForm from "@/app/components/EditSub";
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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [currentSubscriptionBeingEdited, setCurrentSubscriptionBeingEdited] =
		useState<Subscription | null>(null);

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setCurrentSubscriptionBeingEdited(null);
	};

	const handleSubscriptionUpdated = (updatedSubscription: Subscription) => {
		console.log("Updated Subscription received:", updatedSubscription);
		setSubscriptions((prevSubs) =>
			prevSubs.map((sub) =>
				sub.id === updatedSubscription.id ? updatedSubscription : sub
			)
		);
		handleCloseEditModal();
		fetchSubscriptions(setLoading, setError, setSubscriptions);
	};

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
			<button
				className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
				onClick={() => setIsOpen(true)}
			>
				+ Add Subscription
			</button>
			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<SubForm />
				</Modal>
			)}
			{subscriptions.map((subscription) => (
				<div
					key={subscription.id}
					className="mb-3 backdrop-blur-md bg-white/30 border border-white/40 shadow-lg rounded-2xl p-4 text-gray-900"
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
							setCurrentSubscriptionBeingEdited(subscription);
							setIsEditModalOpen(true);
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
			{isEditModalOpen && currentSubscriptionBeingEdited && (
				<Modal onClose={handleCloseEditModal}>
					<h2>Edit Subscription</h2>
					<EditSubForm
						initialSubscription={currentSubscriptionBeingEdited}
						onSubscriptionUpdated={handleSubscriptionUpdated}
						onClose={handleCloseEditModal}
					/>
				</Modal>
			)}
		</div>
	);
}
