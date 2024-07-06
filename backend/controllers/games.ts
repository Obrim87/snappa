import express from 'express';
import models from '../models/index';
import { LogGameData } from '../types';
import { array, date, number, object, ref, string } from 'yup';
require('express-async-errors');

const router = express.Router();
const { Game, UserGame, UserStat, User } = models;

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

  res.json({ games });
});

router.post('/logGame', async (req, res) => {
  // get userIds to provide to yup validation
  const userIds = await User.findAll({
    attributes: ['id'],
  });

  const gameDataSchema = object({
    dateOfGame: date().required('Date is required'),
    address: string().nullable(),
    teamOneScore: number()
      .required('Team 1 score is required')
      .positive()
      .integer()
      .max(15, 'max of 15'),
    teamTwoScore: number()
      .required('Team 2 score is required')
      .positive()
      .integer()
      .max(15, 'max of 15')
      .notOneOf([ref('teamOneScore')], 'team scores cannot be equal'),
    players: array()
      .of(
        object({
          id: number()
            .required('Id is required')
            .integer()
            .oneOf(
              userIds.map((user) => user.id),
              'user id not found'
            ),
          team: number()
            .required('team required')
            .integer()
            .oneOf([1, 2], 'must be 1 or 2'),
          position: number()
            .required('position required')
            .integer()
            .oneOf([1, 2], 'must be 1 or 2'),
          tings: number()
            .required('tings required')
            .integer()
            .min(0, 'min of 0')
            .max(15, 'max of 15'),
          sinks: number()
            .required('sinks required')
            .integer()
            .min(0, 'min of 0')
            .max(15, 'max of 15'),
        })
      )
      .length(4, 'must supply exactly 4 players')
      .required('must supply players'),
  });

  await gameDataSchema.validate(req.body, { abortEarly: false });

  const body: LogGameData = req.body;
  const newGame = await Game.create({
    date: body.dateOfGame,
    location: body.address,
    team1Score: body.teamOneScore,
    team2Score: body.teamTwoScore,
    winningTeam: body.teamOneScore > body.teamTwoScore ? 'team_1' : 'team_2',
  });

  if (!newGame) throw Error('Error creating game');

  // convert player data to array for bulkCreate
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

    // update related userStat with game data
    for (const player of userGamesArr) {
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
    }
  } catch (err) {
    throw Error('Error creating userGame or userStat');
  }

  res.status(201).json({
    success: true,
  });
});

export default router;
