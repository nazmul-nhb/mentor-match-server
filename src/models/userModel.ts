import { Schema, model } from 'mongoose';
import { IUser } from '../types/model';

export const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, 'User Must Provide Name!'],
		trim: true,
	},
	age: {
		type: Number,
		required: [true, 'User Must Provide Age!'],
	},
	email: {
		type: String,
		required: [true, 'User Must Provide Email!'],
		unique: true,
		trim: true,
		validate: {
			validator: (value: string) => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			},
			message: 'Provide a valid email address!',
		},
	},
	image: {
		type: String,
		required: [true, 'User Must Provide Image!'],
	},
	password: {
		type: String,
		required: [true, 'User Must Provide Password!'],
	},
	role: {
		type: String,
		enum: {
			values: ['student', 'trainer', 'admin'],
			message: '${VALUE} is not a valid user role!',
		},
		required: [true, 'User Must Provide Role!'],
		trim: true,
	},
	created: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
