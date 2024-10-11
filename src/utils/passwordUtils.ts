import { TPassword } from '../types/types';
import { IValidationResult } from '../types/interfaces';

export const validatePassword = (password: TPassword): IValidationResult => {
	// Check for proper type
	if (typeof password !== 'string') {
		return {
			validatedPassword: null,
			validationError: 'Password must be a string!',
		};
	}

	// Trim trailing spaces
	const trimmedPassword = password.trim();
	// CHeck if the trimmed password is empty
	if (!trimmedPassword) {
		return {
			validatedPassword: null,
			validationError: 'Password cannot be empty!',
		};
	}

	// Check if the password is at least 6 characters long
	if (trimmedPassword.length < 6) {
		return {
			validatedPassword: null,
			validationError: 'Password must be 6 characters or more!',
		};
	}

	// Return the valid, trimmed password
	return {
		validatedPassword: trimmedPassword,
		validationError: null,
	};
};
