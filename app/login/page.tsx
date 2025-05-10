"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/backend/auth";
import { useAuth } from "@/backend/authContext";
import { useState } from "react";
import Image from "next/image";
import { LoginResponseSuccess, LoginResponseError } from "@/types/auth"; // Adjust import path

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const router = useRouter();
	const { setIsLoggedIn, setUserId, justLoggedIn, setFirstName, setLastName } =
		useAuth();

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");
		const { success, data, error } = await loginUser(email, password);
		if (error) {
			setError(error);
			console.error("Error during login:", error);
			return;
		}
		if (success && (data as LoginResponseSuccess)?.success) {
			const successData: LoginResponseSuccess = data as LoginResponseSuccess;
			setIsLoggedIn(successData.user.isLoggedIn);
			setUserId(successData.user.userId);
			setFirstName(successData.user.firstName);
			setLastName(successData.user.lastName);
			justLoggedIn.current = true;
			localStorage.setItem("isLoggedIn", "true");
			localStorage.setItem("userId", successData.user.userId.toString());
			router.push("/home");
		} else {
			const error: LoginResponseError = data as LoginResponseError;
			setError(error?.error || "Login failed");
			console.error("Login failed:", error);
		}
	};

	return (
		<div>
			<div className="layout-column justify-center align-center bg-white px-6 py-6 ">
				<div className="layout-row justify-center align-center ">
					<Image
						src="/logo.png"
						alt="logo"
						width={64}
						height={64}
						className="w-16 h-16"
					/>
				</div>
				<div className="layout-row justify-center align-center">
					<h1 className="layout-column text-4xl font-bold text-gray-800">
						Sign in on here!
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
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Password
								</label>
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
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500">
						Not a member?{" "}
						<a
							href="/register"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Register
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
