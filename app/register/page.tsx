"use client";
import { useRouter } from "next/navigation";
import { registerUser } from "@/backend/auth";
import { useState } from "react";
import Image from "next/image";
import { RegisterResponseSuccess, RegisterResponseError } from "@/types/auth"; // Adjust import path


export default function RagisterForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");
		const {
			response,
			data,
			error: registerError,
		} = await registerUser(email, password);

		if (registerError) {
			setError(registerError);
			console.error("Error during login:", registerError);
			return;
		}

		if (
			response?.ok &&
			(data as RegisterResponseSuccess)?.message === "Register successful"
		) {
			const successData: RegisterResponseSuccess = data as RegisterResponseSuccess;
			console.log("Login successful:", successData);
			localStorage.setItem("user", JSON.stringify(successData.user));
			router.push("/home");
		} else {
			const errorData: RegisterResponseError = data as RegisterResponseError;
			setError(errorData?.error || "Login failed");
			console.error("Login failed:", errorData);
		}
	};

	return (
		<div>
			<div className="layout-column justify-center align-center bg-white px-6 py-6 ">
				<div className="layout-row justify-center align-center ">
					<Image
						src="/icons8-user-64.png"
						alt="logo"
						width={64}
						height={64}
						className="w-16 h-16"
					/>
				</div>
				<div className="layout-row justify-center align-center">
					<h1 className="layout-column text-4xl font-bold text-gray-800">
						Register here!
					</h1>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleLogin}
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
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Password
							</label>
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

					<p className="mt-10 text-center text-sm/6 text-gray-500">
						Already have an account?{" "}
						<a
							href="/login"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Sign in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
