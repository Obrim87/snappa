import express from 'express';
import models from '../models/index';
import bcrypt from 'bcrypt';
require('express-async-errors');

const router = express.Router();
const { User, UserStat } = models;

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

router.post('/', async (req, res) => {
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
    success: true,
  });
});

export default router;
