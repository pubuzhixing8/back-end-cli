import dotenv from 'dotenv';

// load environment variables
dotenv.config();

export const HOST = process.env.HOST ?? 'http://127.0.0.1';
export const PORT = Number.parseInt(process.env.PORT ?? '8080');
export const NODE_ENV = process.env.NODE_ENV ?? 'production';