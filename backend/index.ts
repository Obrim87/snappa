import express from 'express';
import db from './utils/db';
import usersRouter from './controllers/users';
import gamesRouter from './controllers/games';
import loginRouter from './controllers/login';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';

const { connectToDatabase } = db;
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

start();
