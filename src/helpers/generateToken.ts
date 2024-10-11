import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const generateToken = (
	payload: JwtPayload,
	secret: string,
	expiryTime?: string,
) => {
	if (expiryTime) {
		return jwt.sign(payload, secret, {
			expiresIn: expiryTime,
		});
	}
	return jwt.sign(payload, secret);
};
