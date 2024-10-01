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
