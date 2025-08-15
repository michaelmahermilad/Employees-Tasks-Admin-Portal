import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface AuthPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header('authorization') || '';
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    (req as any).user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
