// index.js

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';

// 1) Load .env into process.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 2) Middleware
app.use(express.json());        // parse JSON bodies
app.use(cookieParser());        // parse cookies

// 3) Mount your auth routes (note the leading slash!)
app.use('/api/v1/auth', authRouter);

// 4) (Optional) simple health-check
app.get('/', (req, res) => {
  res.send('🚀 API is up and running');
});

// 5) Start server
app.listen(PORT, () => {
  console.log(`Server listening → http://localhost:${PORT}`);
});
