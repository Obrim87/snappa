import jwt from 'jsonwebtoken';
import configs from '../utils/configs';
import { Response, NextFunction } from 'express';
import { RequestWithDecodedToken } from '../types';

const { SECRET } = configs;

const tokenExtractor = (
  req: RequestWithDecodedToken,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get('Authorization');

  if (!authorization) {
    throw Error('Unauthorized: No token provided');
  }

  jwt.verify(authorization.substring(7), SECRET, (err, decoded) => {
    if (err) {
      throw Error('Unauthorized: Invalid token');
    }

    req.decodedToken = decoded;
    next();
  });
};

export default tokenExtractor;
