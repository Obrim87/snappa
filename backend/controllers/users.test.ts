import supertest from 'supertest';
import app from '../index';
import models from '../models/index';

const { User, UserStat } = models;
const api = supertest(app);

describe('delete user and userStat table data before each test', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
    });
    await UserStat.destroy({
      where: {},
    });
  });

  describe('GET /users', () => {
    describe('given a request for all users', () => {
      test('should return users in JSON', async () => {
        await api.get('/api/users').expect('Content-Type', /application\/json/);
      });

      test('should respond with a 200 status', async () => {
        await api.get('/api/users').expect(200);
      });

      test('should return all users, including userStat data', async () => {
        const user1 = {
          fname: 'test',
          lname: 'user',
          email: 'user@mail.com',
          password: 'Password123!',
        };

        const user2 = {
          fname: 'test',
          lname: 'user2',
          email: 'user2@mail.com',
          password: 'Password123!',
        };

        await api.post('/api/users').send(user1).expect(201);
        await api.post('/api/users').send(user2).expect(201);

        const response = await api.get('/api/users').expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].userStat).toBeDefined();
      });
    });
  });

  describe('POST /users', () => {
    describe('given a request to create a user', () => {
      const newUser = {
        fname: 'test',
        lname: 'user',
        email: 'test@mail.com',
        password: 'Password123!',
      };

      test('should return users in JSON', async () => {
        await api
          .post('/api/users')
          .send(newUser)
          .expect('Content-Type', /application\/json/);
      });

      test('should respond with a 200 status', async () => {
        await api.get('/api/users').expect(200);
      });

      test('should create both a user and userStats record', async () => {
        await api.post('/api/users').send(newUser).expect(201);

        const userInDb = await User.findOne({
          where: {
            email: newUser.email,
          },
        });

        const userStats = await UserStat.findOne({
          where: {
            userId: userInDb.id,
          },
        });

        expect(userInDb).toBeDefined();
        expect(userStats).toBeDefined();
      });
    });

    describe('when fname, lname, email or password is missing', () => {
      const userData = [
        {
          fname: 'test',
          lname: 'user',
          email: 'me@mail',
        },
        {
          fname: 'test',
          lname: 'user',
          password: 'Password123!',
        },
        {
          fname: 'test',
          email: 'me@mail',
          password: 'Password123!',
        },
        {
          lname: 'user',
          email: 'me@mail',
          password: 'Password123!',
        },
      ];
      test('should respond with status 400', async () => {
        for (const data of userData) {
          await api.post('/api/users').send(data).expect(400);
        }
      });

      test('should not create a new user', async () => {
        await api.post('/api/users').send(userData[0]).expect(400);

        const response = await api.get('/api/users');
        expect(response.body.length).toBe(0);
      });
    });

    describe('when trying to create a user with an existing email', () => {
      const firstUser = {
        fname: 'test',
        lname: 'user',
        email: 'user@mail.com',
        password: 'Password123!',
      };

      const secondUser = {
        fname: 'test',
        lname: 'user2',
        email: 'user@mail.com',
        password: 'Password123!',
      };

      test('should respond with a status 400 code and validation error', async () => {
        await api.post('/api/users').send(firstUser).expect(201);
        const response = await api
          .post('/api/users')
          .send(secondUser)
          .expect(400);

        expect(response.body).toEqual({ error: 'Validation error' });
      });

      test('should not create a new user', async () => {
        await api.post('/api/users').send(firstUser).expect(201);
        await api.post('/api/users').send(secondUser).expect(400);
        const response = await api.get('/api/users');

        expect(response.body.length).toEqual(1);
      });
    });

    describe('when trying to pass a non-email in the email property', () => {
      const user = {
        fname: 'test',
        lname: 'user',
        email: 'emailAddress',
        password: 'Password123!',
      };

      test('should respond with status 400 code', async () => {
        const response = await api.post('/api/users').send(user).expect(400);
        expect(response.body).toEqual({ error: 'email must be a valid email' });
      });

      test('should not create a new user', async () => {
        await api.post('/api/users').send(user).expect(400);
        const response = await api.get('/api/users').expect(200);

        expect(response.body.length).toEqual(0);
      });
    });

    describe('given a password that does not match the pattern', () => {
      // Must be at least 8 chars, have a capital, number and symbol
      const passwordData = [
        'password123!',
        'Password123',
        'Password!!!!',
        'P123!',
      ];

      test('should respond with status 400 code and error code', async () => {
        for (let i = 0; i < passwordData.length; i++) {
          const user = {
            fname: 'test',
            lname: 'user',
            email: 'me@mail.com',
            password: passwordData[i],
          };
          const response = await api.post('/api/users').send(user).expect(400);

          expect(response.body).toEqual({
            error: expect.stringContaining('Password must contain at least'),
          });
        }
      });

      test('should not create a new user', async () => {
        for (let i = 0; i < passwordData.length; i++) {
          const user = {
            fname: 'test',
            lname: 'user',
            email: 'me@mail.com',
            password: passwordData[i],
          };
          await api.post('/api/users').send(user).expect(400);
        }
        const response = await api.get('/api/users').expect(200);

        expect(response.body.length).toBe(0);
      });
    });
  });
});

describe('GET /loggedInUserStats', () => {
  let token;

  beforeAll(async () => {
    await User.destroy({
      where: {},
    });
    await UserStat.destroy({
      where: {},
    });

    const user = {
      fname: 'test',
      lname: 'user',
      email: 'user@mail.com',
      password: 'Password123!',
    };

    await api.post('/api/users').send(user).expect(201);

    const response = await api
      .post('/api/login')
      .send({
        email: 'user@mail.com',
        password: 'Password123!',
      })
      .expect(200);

    token = `Bearer ${response.body.token}`;
  });

  describe('given a request for logged in user stats', () => {
    test('should respond with a 200 status', async () => {
      await api
        .get('/api/users/loggedInUserStats')
        .set('Authorization', token)
        .expect(200);
    });

    test('should return the data in JSON', async () => {
      await api
        .get('/api/users/loggedInUserStats')
        .set('Authorization', token)
        .expect('Content-Type', /json/);
    });

    test('should return the correct user', async () => {
      const response = await api
        .get('/api/users/loggedInUserStats')
        .set('Authorization', token);

      expect(response.body.fname).toEqual('test');
      expect(response.body.lname).toEqual('user');
    });

    test('should return the correct user stats', async () => {
      const response = await api
        .get('/api/users/loggedInUserStats')
        .set('Authorization', token);

      const expectedObject = {
        totalTings: 0,
        totalSinks: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        totalGames: 0,
        totalWins: 0,
        totalLosses: 0,
      };

      expect(response.body.userStat).toBeDefined();
      expect(response.body.userStat).toEqual(expectedObject);
    });
  });

  describe('if no auth token is provided', () => {
    test('should respond with a 400 status', async () => {
      await api.get('/api/users/loggedInUserStats').expect(400);
    });
  });

  describe('if malformed auth token is provided', () => {
    test('should respond with a 400 status', async () => {
      const invalidTokens = [
        'Bearer 123456789',
        'thisisaninvalidtoken',
        'Bearer ',
        // remove a character from end
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODQsImFkbWluIjpmYWxzZSwiaWF0IjoxNzE5OTU2NDAyfQ.G31plPCPQQha2Ijl8p2NVWruqjtEyPesn_r3BuFr1x',
        // add a character to end
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODQsImFkbWluIjpmYWxzZSwiaWF0IjoxNzE5OTU2NDAyfQ.G31plPCPQQha2Ijl8p2NVWruqjtEyPesn_r3BuFr1x81',
      ];

      for (const invalidToken of invalidTokens) {
        await api
          .get('/api/users/loggedInUserStats')
          .set('Authorization', invalidToken)
          .expect(400);
      }
    });
  });

  describe('if the user is not found', () => {
    test('should respond with a 400 status and user not found message', async () => {
      const invalidToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODQsImFkbWluIjpmYWxzZSwiaWF0IjoxNzE5OTU2NDAyfQ.G31plPCPQQha2Ijl8p2NVWruqjtEyPesn_r3BuFr1x8';

      const response = await api
        .get('/api/users/loggedInUserStats')
        .set('Authorization', invalidToken)
        .expect(400);

      console.log(response.body);

      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});
