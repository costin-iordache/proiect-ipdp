export interface LoginResponseSuccess {
	message: "Login successful";
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export interface LoginResponseError {
	error: string;
}

export interface RegisterResponseSuccess {
	message: "Register successful";
	user: {
		id: number;
		username: string;
		email: string;
	};
}

export interface RegisterResponseError {
	error: string;
}

export type RegisterResponse = RegisterResponseSuccess | RegisterResponseError;
export type LoginResponse = LoginResponseSuccess | LoginResponseError;
