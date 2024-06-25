import express from 'express';
import models from '../models/index';
require('express-async-errors');

const router = express.Router();
const { Game, UserGame, User } = models;

router.get('/', async (req, res) => {
  // const games = await Game.findAll({
  //   attributes: { exclude: ['userId'] },
  //   include: {
  //     model: UserGame,
  //     include: {
  //       User
  //     }
  //   },
  // });

  const games = await Game.findAll({ include: { all: true, nested: true } });

  if (!games) {
    throw new Error('Games not found');
  }

  res.send(games);
});

export default router;
