import { z } from 'zod';

export const userSchema = z.object({
	name: z.string().min(1, 'User Must Provide Name!'),
	age: z.number().min(13, 'User must be at least 13 years old'),
	email: z.string().email('Invalid email format'),
	image: z.string().url('Image must be a valid URL'),
	role: z.enum(['student', 'trainer', 'admin'], {
		errorMap: () => ({ message: 'Invalid role' }),
	}),
});
