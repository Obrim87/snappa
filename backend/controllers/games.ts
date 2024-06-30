import express from 'express';
import models from '../models/index';
import { LogGameData } from '../types';
require('express-async-errors');

const router = express.Router();
const { Game, UserGame, UserStat } = models;

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
    throw Error('Games not found');
  }

  res.send(games);
});

router.post('/logGame', async (req, res) => {
  const body: LogGameData = req.body;
  console.log(body);

  const newGame = await Game.create({
    date: body.dateOfGame,
    location: body.address,
    team1Score: body.teamOneScore,
    team2Score: body.teamTwoScore,
    winningTeam: body.teamOneScore > body.teamTwoScore ? 'team_1' : 'team_2',
  });

  if (!newGame) throw Error('Error creating game');

  const userGamesArr = body.players.map((player) => {
    const scoreFor = player.team === 1 ? body.teamOneScore : body.teamTwoScore;
    const scoreAgainst =
      player.team === 1 ? body.teamTwoScore : body.teamOneScore;

    return {
      userId: player.id,
      gameId: newGame.id,
      team: player.team,
      position: player.position,
      tings: player.tings,
      sinks: player.sinks,
      for: scoreFor,
      against: scoreAgainst,
      win: scoreFor > scoreAgainst ? true : false,
    };
  });

  try {
    await UserGame.bulkCreate(userGamesArr, {
      validate: true,
    });

    userGamesArr.forEach(async (player) => {
      console.log('user stat for each');
      await UserStat.increment(
        {
          totalTings: player.tings,
          totalSinks: player.sinks,
          pointsFor: player.for,
          pointsAgainst: player.against,
          totalGames: 1,
          totalWins: player.win ? 1 : 0,
          totalLosses: player.win ? 0 : 1,
        },
        {
          where: {
            userId: player.userId,
          },
        }
      );
    });
  } catch (err) {
    throw Error('Error creating userGame or userStat');
  }

  res.status(201).json({
    success: true,
  });
});

export default router;
