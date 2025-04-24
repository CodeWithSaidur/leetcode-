import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth.route.js';

const app = express();

const PORT = 3000;

app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use("api/v1/auth",authRouter);

app.listen(PORT, () => {
  console.log(`click http://localhost:${PORT}`);
});
