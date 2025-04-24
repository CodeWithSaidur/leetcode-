//Import all controllers from controllers
import express from 'express';
import {
  check,
  login,
  logout,
  register,
} from './controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/check', check);

export default authRouter;
