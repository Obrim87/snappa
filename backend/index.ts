import express from 'express';
import configs from './utils/config';
import db from './utils/db';
import usersRouter from './controllers/users';
import gamesRouter from './controllers/games';
import loginRouter from './controllers/login';
import cors from 'cors';

const { connectToDatabase } = db;
const { PORT } = configs;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/login', loginRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

start();
