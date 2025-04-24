import express from 'express';
import {
  register,
  login,
  logout,
  check,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

// Register a new user
authRouter.post('/register', register);

// Log in an existing user
authRouter.post('/login', login);

// Log out the current user (clears the auth cookie)
authRouter.post('/logout', authMiddleware, logout);

// Check authentication status / refresh session
authRouter.post('/check', authMiddleware, check);

export default authRouter;
