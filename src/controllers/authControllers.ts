import { NextFunction, Request, Response } from 'express';
import { IUserDetails } from '../types/interfaces';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';

// Create New User
export const createUser = async (
	req: Request<{}, {}, IUserDetails>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.body;

		const rawPassword = user.password;

		// generate hashed password
		const hashedPassword = await bcrypt.hash(rawPassword, 13);

		user.password = hashedPassword;

		const newUser = new User(user);
		const savedUser = await newUser.save();

		if (savedUser?._id) {
			return res.status(201).send({
				success: true,
				insertedId: savedUser._id,
				message: `${savedUser.name} is Registered Successfully!`,
			});
		} else {
			throw new Error('Cannot Register New User!');
		}
	} catch (error) {
		if (error instanceof Error) {
			if ((error as any).code === 11000) {
				return res.status(400).json({
					success: false,
					message: 'This Email is Already Registered!',
				});
			}
		}
		
		next(error);
	}
};
