import { LoginResponse, RegisterResponse, RegisterResponseError, RegisterResponseSuccess } from "@/types/auth";

export async function loginUser(
	email: string,
	password: string
): Promise<{ response?: Response; data?: LoginResponse; error?: string }> {
	try {
		const bodyParams = new URLSearchParams({ email, password });
		const response = await fetch("http://ipdp.local/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: bodyParams.toString(),
		});
		const data: LoginResponse = await response.json();
		return { response, data };
	} catch (error: unknown) {
		console.error("Error during fetch in loginUser:", error);
		return { error: "Failed to connect to the server" };
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

		if (response.ok) {
			if ('confirmation_link' in data && (data as RegisterResponseSuccess).confirmation_link) {
				const confirmationLink = (data as RegisterResponseSuccess).confirmation_link;
				console.log('Registration successful! Confirmation link:', confirmationLink);
			  }
			} else {
			  if ('error' in data) {
				console.error('Registration failed:', (data as RegisterResponseError).error);
			  } else {
				console.error('Registration failed: Something went wrong');
			  }
			}
			// Optionally, redirect to a "check your email" page
		return { response, data };
	} catch (error) {
		console.error("Error during fetch in registerUser:", error);
		return { error: "Failed to connect to the server" };
	}
}
