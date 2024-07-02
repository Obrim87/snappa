import supertest from 'supertest';
import app from '../index';
import models from '../models/index';

const { User, UserStat } = models;
const api = supertest(app);

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
      const response = await api.get('/api/users');
      expect(response.status).toBe(200);
    });

    test('should return all users, including userStat data', async () => {
      const user1 = {
        fname: 'test',
        lname: 'user',
        email: 'user@mail.com',
        password: 'hello',
        admin: false,
      };

      const user2 = {
        fname: 'test',
        lname: 'user2',
        email: 'user2@mail.com',
        password: 'hello',
        admin: false,
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
      password: 'hello',
      admin: false,
    };
    test.only('should return users in JSON', async () => {
      const response = await api.post('/api/users').send(newUser);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
    test('should respond with a 200 status', async () => {
      const response = await api.get('/api/users');
      expect(response.status).toBe(200);
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
    test('should respond with status 400', async () => {
      const userData = [
        {
          fname: 'test',
          lname: 'user',
          email: 'me@mail',
        },
        {
          fname: 'test',
          lname: 'user',
          password: 'hello',
        },
        {
          fname: 'test',
          email: 'me@mail',
          password: 'hello',
        },
        {
          lname: 'user',
          email: 'me@mail',
          password: 'hello',
        },
      ];
      for (const data of userData) {
        const response = await api.post('/api/users').send(data);
        expect(response.status).toBe(400);
      }
    });
  });
});

afterAll((done) => {
  done();
});
