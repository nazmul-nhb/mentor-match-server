export interface IErrorObject extends Error {
	status?: number;
}

export interface IUserDetails {
	name: string;
	age: number;
	email: string;
	password: string;
	image: string;
	role: 'student' | 'trainer' | 'admin';
}

export interface ICredentials {
	email: string;
	password: string;
}

export interface IValidationResult {
	validatedPassword: string | null;
	validationError: string | null;
}
