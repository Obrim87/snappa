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
    test('should return in JSON', async () => {
      await api.get('/api/users').expect('Content-Type', /application\/json/);
    });
    // should respond with a 200 status
  });

  test('all users are returned and with userStats', async () => {
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

describe('create users', () => {
  test('api creates both a user and userStats record', async () => {
    const newUser = {
      fname: 'test',
      lname: 'user',
      email: 'test@mail.com',
      password: 'hello',
      admin: false,
    };

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
