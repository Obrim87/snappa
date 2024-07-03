import db from './db';
import app from '../index';

const { connectToDatabase } = db;
const PORT = process.env.PORT;

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

start();
