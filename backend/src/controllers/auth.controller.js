import { UserRole } from '../generated/prisma/index.js';
import { db } from '../libs/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

// Helper to sign JWT
function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error('JWT_SECRET not set in environment');
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '7d',
  });
}

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'All fields are required' });
  }

  try {
    const existing = await db.user.findUnique({
      where: { email },
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: UserRole.USER,
      },
    });

    const token = signToken(user.id);
    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(201).json({
      message: 'User created',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required' });
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(
      password,
      user.password || '',
    );
    if (!valid) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials' });
    }

    const token = signToken(user.id);
    res.cookie('token', token, COOKIE_OPTIONS);

    res.json({
      message: 'Logged in',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: 'Logged out' });
};

export const check = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Authenticated',
      user: req.user,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: 'Error checking authentication' });
  }
};
