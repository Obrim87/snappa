import supertest from 'supertest';
import app from '../index';
import models from '../models/index';

const { User, UserStat } = models;
const api = supertest(app);

describe('/POST /login', () => {
  beforeEach(async () => {
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
  describe('when a valid user logs in', () => {
    const credentials = {
      email: 'user@mail.com',
      password: 'Password123!',
    };

    test('should respond with a status of 200', async () => {
      await api.post('/api/login').send(credentials).expect(200);
    });

    test('should respond with JSON', async () => {
      await api
        .post('/api/login')
        .send(credentials)
        .expect('Content-Type', /json/);
    });

    test('should respond with a valid token', async () => {
      const response = await api
        .post('/api/login')
        .send(credentials)
        .expect(200);

      expect(typeof response.body.token).toBe('string');

      const token = `Bearer ${response.body.token}`;

      await api
        .get('/api/users/loggedInUserStats')
        .set('Authorization', token)
        .expect(200);
    });
  });

  describe('if email or password is not provided', () => {
    test('should respond with a status of 400 and an error message', async () => {
      const credentials = [
        { email: 'me@mail.com' },
        { password: 'Password123!' },
        {},
      ];

      for (const cred of credentials) {
        const response = await api.post('/api/login').send(cred).expect(400);

        expect(response.body.error).toEqual(
          expect.stringContaining('required field')
        );
        expect(response.body.token).toBeUndefined();
      }
    });
  });

  describe('if an email cannot be found in the database', () => {
    test('should respond with a status of 400 and error user not found', async () => {
      const credentials = {
        email: 'unknown@mail.com',
        password: 'Password123!',
      };

      const response = await api
        .post('/api/login')
        .send(credentials)
        .expect(400);

      expect(response.body.error).toEqual('User not found');
    });
  });

  describe('if the password is incorrect', () => {
    test('should respond with a status of 400 and error password incorrect', async () => {
      const credentials = {
        email: 'user@mail.com',
        password: 'incorrectPassword',
      };

      const response = await api
        .post('/api/login')
        .send(credentials)
        .expect(400);

      expect(response.body.error).toEqual('Password incorrect');
    });
  });
});
