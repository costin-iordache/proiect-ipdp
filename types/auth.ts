export interface LoginResponseSuccess {
	success: boolean;
	user: {
		id: number;
		isLoggedIn: boolean;
	};
}

export interface LoginResponseError {
	error: string;
}

export interface RegisterResponseSuccess {
	success: boolean;
	confirmation_link?: string;
}

export interface RegisterResponseError {
	error: string;
}

export type RegisterResponse = RegisterResponseSuccess | RegisterResponseError;
export type LoginResponse = LoginResponseSuccess | LoginResponseError;
