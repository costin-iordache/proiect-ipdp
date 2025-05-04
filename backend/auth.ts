import {
	LoginResponse,
	LoginResponseSuccess,
	LoginResponseError,
	RegisterResponse,
	RegisterResponseError,
	RegisterResponseSuccess,
} from "@/types/auth";

export async function loginUser(
	email: string,
	password: string
): Promise<{ success?: boolean; data?: LoginResponse; error?: string }> {
	try {
		const bodyParams = new URLSearchParams({ email, password });
		const response = await fetch("http://ipdp.local/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: bodyParams.toString(),
			credentials: "include",
		});

		const data: LoginResponse = await response.json();

		if (response.ok && "user" in data) {
			const successData = data as LoginResponseSuccess;
			console.log("Login successful:", successData);
			return { success: true, data: successData };
		} else {
			const errorData = data as LoginResponseError;
			console.error("Login failed:", errorData);
			return { success: false, error: errorData.error };
		}
	} catch (error) {
		console.error("Error during fetch in loginUser:", error);
		return {
			success: false,
			error: "An unexpected error occurred during login.",
		};
	}
}

export async function checkAuth(): Promise<{
	isLoggedIn: boolean;
	userId?: number;
	firstName?: string;
	lastName?: string;
}> {
	try {
		const response = await fetch("http://ipdp.local/check-auth.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // send cookies with request
		});

		if (response.ok) {
			const data = await response.json();
			return {
				isLoggedIn: data.isLoggedIn,
				userId: data.userId,
				firstName: data.firstName,
				lastName: data.lastName,
			};
		} else {
			console.error("Error checking authentication:", response.status);
			return { isLoggedIn: false };
		}
	} catch (error) {
		console.error("Error during fetch in checkAuth:", error);
		return { isLoggedIn: false };
	}
}

export async function registerUser(
	email: string,
	password: string
	// confirmPassword?: string // Optional confirm password
): Promise<{ response?: Response; data?: RegisterResponse; error?: string }> {
	try {
		const bodyParams = new URLSearchParams({ email, password });
		const response = await fetch("http://ipdp.local/register.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: bodyParams.toString(),
		});
		const data: RegisterResponse = await response.json();

		if ("success" in data) {
			if (
				"confirmation_link" in data &&
				(data as RegisterResponseSuccess).confirmation_link
			) {
				const confirmationLink = (data as RegisterResponseSuccess)
					.confirmation_link;
				console.log(
					"Registration successful! Confirmation link:",
					confirmationLink
				);
			}
		} else {
			if ("error" in data) {
				console.error(
					"Registration failed:",
					(data as RegisterResponseError).error
				);
			} else {
				console.error("Registration failed: Something went wrong");
			}
		}
		// Optional redirect to "check your email" page
		return { response, data };
	} catch (error) {
		console.error("Error during fetch in registerUser:", error);
		return { error: "Failed to connect to the server" };
	}
}

export async function logoutUser(): Promise<{
	success: boolean;
	error?: string;
}> {
	try {
		const response = await fetch("http://ipdp.local/logout.php", {
			method: "POST",
			credentials: "include",
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Logout failed on server:", errorData);
			return { success: false, error: errorData?.error || "Logout failed" };
		}

		const successData = await response.json();
		console.log("Logout successful on server:", successData);
		return { success: true };
	} catch (error: unknown) {
		let errorMessage = "An unexpected error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
			console.error("Error during logout fetch:", errorMessage);
		} else {
			console.error("Error during logout fetch:", error); // Log the unknown error
		}
		return { success: false, error: errorMessage };
	}
}
