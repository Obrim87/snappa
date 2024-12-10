import { NextFunction, Response } from 'express';
import tokenExtractor from './tokenExtractor';
import { RequestWithDecodedToken } from '../types';

describe('TokenExtractor middleware', () => {
  let req: Partial<RequestWithDecodedToken>;
  let res: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
    };
  });

  test('valid token provided', () => {
    req = {
      get: function (name: string) {
        if (name.toLowerCase() === 'authorization') {
          return this.headers.Authorization;
        }
      },
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImFkbWluIjp0cnVlLCJpYXQiOjE3MjA1MTcyNjl9.kSVkr2vLFeh8YhyEdYTberU6e176jr2JYMAiIGx4nL8',
      },
    };

    tokenExtractor(
      req as RequestWithDecodedToken,
      res as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  test('invalid token provided', () => {
    req = {
      get: function (name: string) {
        if (name.toLowerCase() === 'authorization') {
          return this.headers.Authorization;
        }
      },
      headers: {
        Authorization: 'Bearer invalidToken',
      },
    };

    expect(() => {
      tokenExtractor(
        req as RequestWithDecodedToken,
        res as Response,
        nextFunction
      );
    }).toThrow('Unauthorized: Invalid token');
  });

  test('no authorization header provided', () => {
    req = {
      get: function () {
        return undefined;
      },
    };

    expect(() => {
      tokenExtractor(
        req as RequestWithDecodedToken,
        res as Response,
        nextFunction
      );
    }).toThrow('Unauthorized: No token provided');
  });
});
