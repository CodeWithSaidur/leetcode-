// *import model first and understand Schema carefully
import { db } from '../libs/db.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        // 01:29:09
      },
    });
  } catch (error) {}
};

export const login = (req, res) => {
  res.json({ message: 'login route' });
};

export const logout = (req, res) => {
  res.json({ message: 'logout route' });
};

export const check = (req, res) => {
  res.json({ message: 'check route' });
};
