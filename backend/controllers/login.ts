require('express-async-errors');
import express from 'express';
import models from '../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { object, string } from 'yup';

const router = express.Router();
const { User } = models;

const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

router.post('/', async (req, res) => {
  await loginSchema.validate(req.body);

  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw Error('User not found');
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    throw Error('Password incorrect');
  }

  const userForToken = {
    id: user.id,
    admin: user.admin,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.json({
    token,
  });
});

export default router;
