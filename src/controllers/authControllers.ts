import { NextFunction, Request, Response } from 'express';
import type { ICredentials, IUserDetails } from '../types/interfaces';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { accessTokenSecret } from '../utils/constants';
import { generateToken } from '../helpers/generateToken';

// Create New User
export const createUser = async (
	req: Request<{}, {}, IUserDetails>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.body;

		const rawPassword = user.password.trim();

		// Validate Password
		if (!rawPassword || !rawPassword.length) {
			return res.status(400).send({
				success: false,
				message: 'Password cannot be empty!',
			});
		}

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
				return res.status(400).send({
					success: false,
					message: 'This Email is Already Registered!',
				});
			}
		}

		next(error);
	}
};

// Login A User
export const loginUser = async (
	req: Request<{}, {}, ICredentials>,
	res: Response,
	next: NextFunction,
) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).send({
			success: false,
			message: 'Invalid Credentials!',
		});
	}

	const passwordMatched = await bcrypt.compare(password, user.password);

	if (!passwordMatched) {
		return res.status(401).send({
			success: false,
			message: 'Invalid Credentials!',
		});
	}

	const { password: _, ...userWithoutPassword } = user.toObject();

	const accessToken = generateToken(
		userWithoutPassword,
		accessTokenSecret,
		'1h',
	);

	return res.status(200).send({
		success: true,
		message: 'Successfully Logged In!',
		accessToken,
	});
};
