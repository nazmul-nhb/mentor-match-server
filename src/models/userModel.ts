import { Schema, model } from 'mongoose';
import { IUser } from '../types/model';

export const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, 'User Must Provide Name!'],
	},
	age: {
		type: Number,
		required: [true, 'User Must Provide Age!'],
	},
	email: {
		type: String,
		required: [true, 'User Must Provide Email!'],
		unique: true,
	},
	image: {
		type: String,
		required: [true, 'User Must Provide Image!'],
	},
	role: {
		type: String,
		enum: {
			values: ['student', 'trainer', 'admin'],
			message: '${VALUE} is not a valid user role',
		},
		required: [true, 'User Must Provide Role!'],
	},
	created: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
