import errorHandler from './errorHandler';
import { NextFunction, Response } from 'express';

describe('errorHandler middleware', () => {
  const req = {};
  const next: NextFunction = jest.fn();
  let res: Partial<Response>;
  let err;

  beforeEach(() => {
    err = {};
    res = {};
  });

  test('valid error passed to handler should return 400 and message', () => {
    err = {
      message: 'This is an error!',
    };
    res = {
      status: jest.fn(function () {
        return this;
      }),
      json: jest.fn(),
    };

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'This is an error!' });
  });

  test('no error passed to handler should call next', () => {
    errorHandler(err, req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
