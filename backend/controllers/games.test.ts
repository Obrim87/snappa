import supertest from 'supertest';
import app from '../index';
import models from '../models/index';

const { User, UserStat, UserGame, Game } = models;
const api = supertest(app);

describe('/GET /games', () => {
  beforeAll(async () => {
    await User.destroy({
      where: {},
    });
    await UserStat.destroy({
      where: {},
    });

    const newUser = {
      fname: 'test',
      lname: 'user',
      email: 'user@mail.com',
      password: 'Password123!',
    };

    await api.post('/api/users').send(newUser).expect(201);
  });

  describe('when you request all games', () => {
    test('should return games in JSON', async () => {
      await api.get('/api/games').expect('Content-Type', /application\/json/);
    });

    test('should respond with a 200 status', async () => {
      await api.get('/api/games').expect(200);
    });
  });
});

describe('/POST /games/logGames', () => {
  describe('when you log a valid game', () => {
    let userIdArr;
    let game;

    beforeEach(async () => {
      userIdArr = [];
      // purge all tables
      await User.destroy({
        where: {},
      });
      await UserStat.destroy({
        where: {},
      });
      await UserGame.destroy({
        where: {},
      });
      await Game.destroy({
        where: {},
      });

      // create 4 new users
      for (let i = 0; i < 4; i++) {
        const response = await api
          .post('/api/users')
          .send({
            fname: `test${i}`,
            lname: `user${i}`,
            email: `user${i}@mail.com`,
            password: 'Password123!',
          })
          .expect(201);

        userIdArr.push(response.body.id);
      }

      game = {
        dateOfGame: '2024-07-04T00:00:00.000Z',
        address: null,
        players: [
          { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
          { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
          { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
          { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
        ],
        teamOneScore: 1,
        teamTwoScore: 5,
      };
    });

    test('should respond in JSON', async () => {
      await api
        .post('/api/games/logGame')
        .send(game)
        .expect('Content-Type', /application\/json/);
    });

    test('should respond with a 201 status', async () => {
      const response = await api
        .post('/api/games/logGame')
        .send(game)
        .expect(201);

      expect(response.body).toEqual({ success: true });
    });

    test('should increase userStat data by correct amount for all players', async () => {
      await api.post('/api/games/logGame').send(game).expect(201);

      const userStats = await UserStat.findAll({});

      for (const userStat of userStats) {
        if (userStat.id === userIdArr[0]) {
          expect(userStat.totalTings).toEqual(2);
          expect(userStat.totalSinks).toEqual(1);
          expect(userStat.pointsAgainst).toEqual(5);
          expect(userStat.pointsFor).toEqual(1);
        }

        if (userStat.id === userIdArr[2]) {
          expect(userStat.totalTings).toEqual(3);
          expect(userStat.totalSinks).toEqual(2);
          expect(userStat.pointsAgainst).toEqual(1);
          expect(userStat.pointsFor).toEqual(5);
        }
      }
    });
  });

  describe('when you send invalid game data', () => {
    test('should return a 400 status', async () => {
      const userIdArr = [];
      // purge all tables
      await User.destroy({
        where: {},
      });
      await UserStat.destroy({
        where: {},
      });
      await UserGame.destroy({
        where: {},
      });
      await Game.destroy({
        where: {},
      });

      // create 4 new users
      for (let i = 0; i < 4; i++) {
        const response = await api
          .post('/api/users')
          .send({
            fname: `test${i}`,
            lname: `user${i}`,
            email: `user${i}@mail.com`,
            password: 'Password123!',
          })
          .expect(201);

        userIdArr.push(response.body.id);
      }

      const invalidGameData = [
        {
          // team scores cannot be equal
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 5,
          teamTwoScore: 5,
        },
        {
          // invalid userId
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0] + 10, team: 3, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // missing data
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            {
              id: userIdArr[1],
              team: undefined,
              position: 2,
              tings: 1,
              sinks: 0,
            },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // date incorrect format
          dateOfGame: 'hello',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // number not supplied
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 'two', tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // property missing
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // too many players
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
            { id: userIdArr[3], team: 2, position: 2, tings: 2, sinks: 0 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // too few players
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          players: [
            { id: userIdArr[0], team: 1, position: 1, tings: 2, sinks: 1 },
            { id: userIdArr[1], team: 1, position: 2, tings: 1, sinks: 0 },
            { id: userIdArr[2], team: 2, position: 1, tings: 3, sinks: 2 },
          ],
          teamOneScore: 1,
          teamTwoScore: 5,
        },
        {
          // players missing
          dateOfGame: '2024-07-04T00:00:00.000Z',
          address: null,
          teamOneScore: 1,
          teamTwoScore: 5,
        },
      ];

      for (const gameData of invalidGameData) {
        await api.post('/api/games/logGame').send(gameData).expect(400);
      }

      const games = await Game.findAll({});
      const userGames = await UserGame.findAll({});

      expect(games.length).toEqual(0);
      expect(userGames.length).toEqual(0);
    });
  });

  describe('when you log a game', () => {});
});
