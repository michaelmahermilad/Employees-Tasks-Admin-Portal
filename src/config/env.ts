import dotenv from 'dotenv';
dotenv.config();

const required = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_SECRET: required('JWT_SECRET'),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX ?? 100)
} as const;
