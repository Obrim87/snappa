import express from 'express';
import models from '../models/index';
import bcrypt from 'bcrypt';
require('express-async-errors');

const router = express.Router();
const { User } = models;

router.get('/', async (req, res) => {
  const users = await User.findAll();

  if (!users) {
    throw new Error('Users not found');
  }

  res.send(users);
});

router.post('/', async (req, res, next) => {
  const { fname, lname, email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    fname,
    lname,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    throw Error('Email already in use');
  }

  res.status(201).json({
    success: true,
  });
});

export default router;
