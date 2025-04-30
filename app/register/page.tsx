"use client";
import { useRouter } from "next/navigation";
import { registerUser } from "@/backend/auth";
import { useState } from "react";
import { RegisterResponseSuccess, RegisterResponseError } from "@/types/auth"; // Adjust import path

export default function RagisterForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const handleRegister = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");
		const { response, data, error } = await registerUser(email, password);
		if (error) {
			setError(error);
			console.error("Error during registration:", error);
			return;
		}
		if (response?.ok && (data as RegisterResponseSuccess)?.success) {
			const successData: RegisterResponseSuccess =
				data as RegisterResponseSuccess;
			console.log("Registration successful:", successData);
			router.push("/login");
		} else {
			const errorData: RegisterResponseError = data as RegisterResponseError;
			setError(errorData?.error || "Registration failed");
			console.error("Registration failed:", errorData);
		}
	};

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm layout-column justify-center align-center bg-white px-6 py-6 ">
			<form
				onSubmit={handleRegister}
				action="#"
				method="POST"
				className="space-y-6"
			>
				<div>
					<label
						htmlFor="email"
						className="block text-sm/6 font-medium text-gray-900"
					>
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							value={email}
							required
							autoComplete="email"
							onChange={(e) => setEmail(e.target.value)}
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="password"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Password
						</label>
						<div className="text-sm">
							<a
								href="#"
								className="font-semibold text-indigo-600 hover:text-indigo-500"
							>
								Forgot password?
							</a>
						</div>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
}
