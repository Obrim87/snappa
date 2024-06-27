import dotenv from 'dotenv';
dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
};

// figure out why ts node not being triggered for refresh on save
// may have to just use dotenv
