import express, { Request } from 'express';
import models from '../models/index';
import bcrypt from 'bcrypt';
import tokenExtractor from '../middleware/tokenExtractor';
import { object, string } from 'yup';
require('express-async-errors');

const router = express.Router();
const { User, UserStat, UserGame, Game } = models;

interface RequestWithToken extends Request {
  decodedToken: {
    id: number;
    admin: boolean;
    iat: number;
  };
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: UserStat,
    },
  });

  if (!users) {
    throw new Error('Users not found');
  }

  res.send(users);
});

router.get(
  '/loggedInUserStats',
  tokenExtractor,
  async (req: RequestWithToken, res) => {
    const user = await User.findByPk(req.decodedToken.id, {
      attributes: { exclude: ['admin', 'email', 'password'] },
      include: [
        {
          model: UserStat,
          attributes: { exclude: ['userId', 'id'] },
        },
        {
          model: Game,
        },
      ],
    });

    if (!user) throw Error('User not found');
    res.json(user);
  }
);

const userSchema = object({
  fname: string().required(),
  lname: string().required(),
  email: string().email().required(),
  password: string()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, 1 uppercase, 1 number and 1 special character'
    ),
});

router.post('/', async (req, res) => {
  await userSchema.validate(req.body);

  const { fname, lname, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    fname,
    lname,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    throw Error('Email already in use');
  }

  try {
    await UserStat.create({
      totalTings: 0,
      totalSinks: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      totalGames: 0,
      totalWins: 0,
      totalLosses: 0,
      userId: newUser.id,
    });
  } catch (err) {
    throw Error('Error creating stats');
  }

  res.status(201).json({
    id: newUser.id,
    email: newUser.email,
  });
});

export default router;
