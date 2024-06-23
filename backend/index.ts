// const express = require('express');
import express, { Request, Response } from 'express';
const { PORT } = require('./utils/config');

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
