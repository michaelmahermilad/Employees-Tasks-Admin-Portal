import express from 'express';
import morgan from 'morgan';
import { applySecurity } from './middleware/security.js';
import { errorHandler } from './middleware/errorHandler.js';
import router from './routes/index.js';

export const createApp = () => {
  const app = express();
  applySecurity(app);
  app.use(express.json({ limit: '200kb' }));
  app.use(morgan(process.env.LOG_LEVEL ?? 'dev'));
  app.use('/api', router);
  app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));
  app.use(errorHandler);
  return app;
};
