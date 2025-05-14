"use client";
import { useRouter } from "next/navigation";
import { submitSub } from "@/backend/submitSub";
import {
	SubscriptionResponseError,
	SubscriptionResponseSuccess,
} from "@/types/subResponse";
import { useState, useEffect } from "react";

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

export default function AddSubscription() {
	const [platform, setPlatform] = useState(predefinedApps[0]);
	const [customPlatform, setCustomPlatform] = useState("");
	const [startDate, setStartDate] = useState("");
	const [billingDate, setBillingDate] = useState("");
	const [price, setPrice] = useState("");
	const [frequency, setFrequency] = useState("monthly");
	const [currency, setCurrency] = useState("RON");
	const [error, setError] = useState<string>("");
	const router = useRouter();

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
				const { response, data, error } = await submitSub(
					platform,
					startDate!,
					billingDate!,
					frequency,
					price,
					currency,
					userId
				);
				if (error) {
					setError(error);
					console.error("Error during registration:", error);
					return;
				}
				if (response?.ok && (data as SubscriptionResponseSuccess)?.success) {
					const successData: SubscriptionResponseSuccess =
						data as SubscriptionResponseSuccess;
					console.log("Registration successful:", successData);
					router.push("/home");
				} else {
					const errorData: SubscriptionResponseError =
						data as SubscriptionResponseError;
					setError(errorData?.error || "Registration failed");
					console.error("Registration failed:", errorData);
				}
			} else {
				setError("User ID not found");
				console.error(error);
			}
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
			<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
				Adaugă o Subscriptie
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* App Selection */}
				<div>
					<label
						htmlFor="platform"
						className="block text-sm font-medium text-gray-700"
					>
						Alege aplicația
					</label>
					<select
						id="platform"
						value={platform}
						onChange={(e) => setPlatform(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
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
							Nume aplicație personalizată
						</label>
						<input
							type="text"
							id="customPlatform"
							value={customPlatform}
							onChange={(e) => setCustomPlatform(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
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
						Data de început
					</label>
					<input
						type="date"
						id="startDate"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
						required
					/>
				</div>

				{/* Frequency */}
				<div>
					<label
						htmlFor="frequency"
						className="block text-sm font-medium text-gray-700"
					>
						Frecvență
					</label>
					<select
						id="frequency"
						value={frequency}
						onChange={(e) => setFrequency(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
					>
						{frequencyOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				{/* End Date (auto-calculated) */}
				<div>
					<label
						htmlFor="billingDate"
						className="block text-sm font-medium text-gray-700"
					>
						Data de plata
					</label>
					<input
						type="date"
						id="billingDate"
						value={billingDate}
						onChange={(e) => setBillingDate(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
						required
					/>
				</div>

				{/* Price */}
				<div>
					<label
						htmlFor="price"
						className="block text-sm font-medium text-gray-700"
					>
						Preț
					</label>
					<input
						type="number"
						id="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
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
						Moneda
					</label>
					<select
						id="currency"
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
					>
						{predefinedCurrencies.map((app) => (
							<option key={app} value={app}>
								{app}
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
				>
					Adaugă abonament
				</button>
			</form>
		</div>
	);
}
