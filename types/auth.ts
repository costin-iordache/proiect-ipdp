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
	message: string;
	confirmation_link?: string;
}

export interface RegisterResponseError {
	error: string;
}

export type RegisterResponse = RegisterResponseSuccess | RegisterResponseError;
export type LoginResponse = LoginResponseSuccess | LoginResponseError;


export interface UpdatePasswordResponseSuccess{
	success: boolean;
	message: string;
}

export interface UpdatePasswordResponseError{
	error: string;
}

export type UpdatePasswordResponse = UpdatePasswordResponseSuccess | UpdatePasswordResponseError;
