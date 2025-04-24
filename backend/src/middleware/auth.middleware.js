import jwt from 'jsonwebtoken';
import { db } from '../libs/db.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized' });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized' });
    }

    const user = db.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};
