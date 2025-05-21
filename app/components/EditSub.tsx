"use client";
import { editSubscription } from "@/backend/subs"; // Assuming you have this function
import {
	EditSubscriptionResponseError,
	EditSubscriptionResponseSuccess,
	Subscription,
} from "@/types/subResponse";
import { useState, useEffect } from "react";

interface EditSubFormProps {
	initialSubscription: Subscription;
	onSubscriptionUpdated: (updatedSubscription: Subscription) => void;
	onClose: () => void;
}

const predefinedApps = [
	"Netflix",
	"Spotify",
	"YouTube Premium",
	"HBO Max",
	"Apple Music",
	"Disney+",
	"Amazon Prime Video",
	"Altul",
];

const predefinedCurrencies = ["RON", "EUR", "USD", "GBP"];

const frequencyOptions = [
	{ label: "Lunar", value: "monthly" },
	{ label: "Anual", value: "yearly" },
];

function calculateEndDate(start: string, frequency: string): string {
	if (!start) return "";
	const date = new Date(start);
	if (frequency === "monthly") date.setMonth(date.getMonth() + 1);
	if (frequency === "yearly") date.setFullYear(date.getFullYear() + 1);
	return date.toISOString().split("T")[0];
}

export default function EditSubForm({
	initialSubscription,
	onSubscriptionUpdated,
	onClose,
}: EditSubFormProps) {
	const [platform, setPlatform] = useState(initialSubscription.platform);
	const [customPlatform, setCustomPlatform] = useState("");
	const [startDate, setStartDate] = useState(initialSubscription.start_date);
	const [billingDate, setBillingDate] = useState(
		initialSubscription.billing_date
	);
	const [price, setPrice] = useState(initialSubscription.price);
	const [frequency, setFrequency] = useState(
		initialSubscription.billing_frequency
	);
	const [currency, setCurrency] = useState(initialSubscription.currency);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		if (startDate && frequency) {
			const calculated = calculateEndDate(startDate, frequency);
			setBillingDate(calculated);
		}
	}, [startDate, frequency]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const authData = localStorage.getItem("authData");
		if (authData) {
			const userId = parseInt(JSON.parse(authData).userId);
			if (!isNaN(userId)) {
				const platformToSend = platform === "Altul" ? customPlatform : platform;
                const { response, data, error } = await editSubscription({
					id: initialSubscription.id,
					userId: userId,
					platform: platformToSend,
					startDate: startDate!,
					billingDate: billingDate!,
					billingFrequency: frequency,
					price: price,
					currency: currency,
				});

				if (error) {
					setError(error);
					console.error("Error during sub editing:", error);
					return;
				}

                if (response?.ok && (data as EditSubscriptionResponseSuccess)?.success) {
                    const successData: EditSubscriptionResponseSuccess =
                        data as EditSubscriptionResponseSuccess;
                    console.log("Sub edited successfully:", successData);
                    onSubscriptionUpdated(successData.updatedSubscription);
                    onClose();
				} else {
					const errorData: EditSubscriptionResponseError =
						data as EditSubscriptionResponseError;
					setError(errorData?.error || "Sub edit failed");
					console.error("Sub edit failed:", errorData);
				}
			} else {
				setError("User ID not found");
				console.error("User ID not found");
			}
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-4 w-100 bg-white shadow-xl rounded-2xl">
			<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
				Edit Subscription
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4 p-4">
				{/* App Selection */}
				<div>
					<label
						htmlFor="platform"
						className="block text-sm font-medium text-gray-700"
					>
						Choose App
					</label>
					<select
						id="platform"
						value={platform}
						onChange={(e) => setPlatform(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
					>
						{predefinedApps.map((app) => (
							<option key={app} value={app}>
								{app}
							</option>
						))}
					</select>
				</div>

				{platform === "Altul" && (
					<div>
						<label
							htmlFor="customPlatform"
							className="block text-sm font-medium text-gray-700"
						>
							App Name
						</label>
						<input
							type="text"
							id="customPlatform"
							value={customPlatform}
							onChange={(e) => setCustomPlatform(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
							required
						/>
					</div>
				)}

				{/* Start Date */}
				<div>
					<label
						htmlFor="startDate"
						className="block text-sm font-medium text-gray-700"
					>
						Starting Date
					</label>
					<input
						type="date"
						id="startDate"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
						required
					/>
				</div>

				{/* Frequency */}
				<div>
					<label
						htmlFor="frequency"
						className="block text-sm font-medium text-gray-700"
					>
						Frequency
					</label>
					<select
						id="frequency"
						value={frequency}
						onChange={(e) => setFrequency(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
					>
						{frequencyOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				{/* Billing Date (auto-calculated but editable) */}
				<div>
					<label
						htmlFor="billingDate"
						className="block text-sm font-medium text-gray-700"
					>
						Billing Date
					</label>
					<input
						type="date"
						id="billingDate"
						value={billingDate}
						onChange={(e) => setBillingDate(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
						required
					/>
				</div>

				{/* Price */}
				<div>
					<label
						htmlFor="price"
						className="block text-sm font-medium text-gray-700"
					>
						Price
					</label>
					<input
						type="number"
						id="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
						min="0"
						step="0.01"
						required
					/>
				</div>

				{/* Currency */}
				<div>
					<label
						htmlFor="currency"
						className="block text-sm font-medium text-gray-700"
					>
						Currency
					</label>
					<select
						id="currency"
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-700"
					>
						{predefinedCurrencies.map((app) => (
							<option key={app} value={app}>
								{app}
							</option>
						))}
					</select>
				</div>
				{error && <div className="text-red-500 text-sm mt-2">{error}</div>}
				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
					onClick={handleSubmit}
				>
					Save Changes
				</button>
				<button
					type="button"
					className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition mt-2"
					onClick={onClose}
				>
					Cancel
				</button>
			</form>
		</div>
	);
}
