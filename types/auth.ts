export interface LoginResponseSuccess {
	message: string;
	user: {
		id: number;
		email: string;
	};
}

export interface LoginResponseError {
	error: string;
}

export interface RegisterResponseSuccess {
	message: string;
	confirmation_link?: string;
}

export interface RegisterResponseError {
	error: string;
}

export type RegisterResponse = RegisterResponseSuccess | RegisterResponseError;
export type LoginResponse = LoginResponseSuccess | LoginResponseError;
