export interface LoginResponseSuccess {
	success: boolean;
	user: {
		userId: number;
		firstName: string;
		lastName: string;
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
