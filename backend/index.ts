import express from 'express';
import usersRouter from './controllers/users';
import gamesRouter from './controllers/games';
import loginRouter from './controllers/login';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);

export default app;
