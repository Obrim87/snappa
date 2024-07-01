import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

export default {
  DATABASE_URL,
  PORT,
  SECRET: process.env.SECRET,
};
