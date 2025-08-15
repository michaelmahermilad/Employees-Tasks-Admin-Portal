import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Express } from 'express';
import { env } from '../config/env.js';

export const applySecurity = (app: Express) => {
  app.set('trust proxy', 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false
  }));
};
