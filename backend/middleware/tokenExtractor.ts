import jwt from 'jsonwebtoken';

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET
    );
  } else {
    throw Error('token missing');
  }
  next();
};

export default tokenExtractor;
