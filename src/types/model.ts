import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	age: number;
	email: string;
	password: string;
	image: string;
	role: 'student' | 'trainer' | 'admin';
	created: Date;
}
