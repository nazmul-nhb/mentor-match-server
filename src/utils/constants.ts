import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 4242;

export const mongoURI = process.env.MONGO_CONNECTION_STRING as string;

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
