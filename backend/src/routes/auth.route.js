import express from 'express';
import {
  register,
  login,
  logout,
  check,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Register a new user
authRouter.post('/register', register);

// Log in an existing user
authRouter.post('/login', login);

// Log out the current user (clears the auth cookie)
authRouter.post('/logout', logout);

// Check authentication status / refresh session
authRouter.post('/check', check);

export default authRouter;
