require('express-async-errors');
import express from 'express';
import models from '../models/index';
import bcrypt from 'bcrypt';
import { UserType } from '../types';

const router = express.Router();
const { User } = models;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user: UserType = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const verifyPassword = bcrypt.compare(password, user.password);
});

export default router;

// figure out why I am getting type error
