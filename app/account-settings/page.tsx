"use client";
import { useState } from "react";
import {
	UpdatePasswordResponseError,
	UpdatePasswordResponseSuccess,
} from "@/types/auth";
import { updatePassword } from "@/backend/auth";

export default function AccountSettings() {
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	// const router = useRouter();
	const handleUpdatePassword = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");
		const authData = localStorage.getItem("authData");
		if (!authData) {
			setError("User not authenticated");
			return;
		}
		const userId = JSON.parse(authData).userId;
		const { response, data, error } = await updatePassword(
			userId,
			currentPassword,
			newPassword
		);
		if (error) {
			setError(error);
			console.error("Error during password update:", error);
			return;
		}
		if (response?.ok && (data as UpdatePasswordResponseSuccess)?.success) {
			const successData: UpdatePasswordResponseSuccess =
				data as UpdatePasswordResponseSuccess;
			setSuccess(successData?.message);
			console.log("Password update successful:", successData);
		} else {
			const errorData: UpdatePasswordResponseError =
				data as UpdatePasswordResponseError;
			setError(errorData?.error || "Password update failed");
			console.error("Password update failed:", errorData);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-500 to-white-500 text-gray-800 p-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2 space-y-4">
					<h1 className="text-2xl font-bold">Account Settings</h1>
					<p>Manage your account settings here.</p>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2 space-y-4">
					<h2 className="text-xl font-bold">Change Password</h2>
					<p>Update your password.</p>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm/6 font-medium text-gray-900"
					>
						Current Password
					</label>
					<div className="mt-2">
						<input
							id="currentPassword"
							name="currentPassword"
							type="currentPassword"
							required
							autoComplete="current-password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
					<label
						htmlFor="password"
						className="block text-sm/6 font-medium text-gray-900"
					>
						New Password
					</label>
					<div className="mt-2">
						<input
							id="newPassword"
							name="newPassword"
							type="newPassword"
							required
							autoComplete="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
					<div>
						{success && <p>{success}</p>}
						{error && <p style={{ color: "red" }}>{error}</p>}
						<button
							onClick={handleUpdatePassword}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Change Password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
