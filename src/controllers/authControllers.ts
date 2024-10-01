import { NextFunction, Request, Response } from 'express';
import { IUserDetails } from '../types/interfaces';
import { User } from '../models/userModel';
import { z } from 'zod';

// Create New User
export const createUser = async (
	req: Request<{}, {}, IUserDetails>,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Insert a single user
		const newUser = new User(req.body);
		const savedUser = await newUser.save();
		if (savedUser?._id) {
			return res.status(201).send({
				success: true,
				insertedId: savedUser._id,
				message: `${savedUser.name} is Created Successfully!`,
			});
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
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				success: false,
				message: error.errors[0].message,
			});
		}
		next(error);
	}
};
