import { prisma } from '../prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export async function register(username: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) throw new Error('Username already exists');
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, password: hashed } });
  return { id: user.id, username: user.username, createdAt: user.createdAt };
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: '8h' });
  return { token };
}
