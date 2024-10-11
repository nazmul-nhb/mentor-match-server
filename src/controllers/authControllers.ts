import { NextFunction, Request, Response } from 'express';
import type { ICredentials, IUserDetails } from '../types/interfaces';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { accessTokenSecret } from '../utils/constants';
import { generateToken } from '../helpers/generateToken';
import { validatePassword } from '../utils/passwordUtils';

// Create New User
export const createUser = async (
	req: Request<{}, {}, IUserDetails>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.body;

		// Validate Password using Custom Function
		const { validPassword, validationError } = validatePassword(user.password);

		if (!validPassword) {
			return res.status(400).send({
				success: false,
				message: validationError,
			});
		}

		// generate hashed password
		const hashedPassword = await bcrypt.hash(validPassword, 13);

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
			console.error(error.message);

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
	try {
		const { email, password } = req.body;

		// Validate Password using Custom Function
		const { validPassword, validationError } = validatePassword(password);

		if (!validPassword) {
			return res.status(400).send({
				success: false,
				message: validationError,
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).send({
				success: false,
				message: 'Invalid Credentials!',
			});
		}

		const passwordMatched = await bcrypt.compare(validPassword, user.password);

		if (!passwordMatched) {
			return res.status(401).send({
				success: false,
				message: 'Invalid Credentials!',
			});
		}

		// Delete password from user object
		const { password: _, ...userWithoutPassword } = user.toObject();

		// Generate access token
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
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			return res.status(400).send({
				success: false,
				message: error.message,
			});
		}

		next(error);
	}
};
