import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = { body: req.body, params: req.params, query: req.query };
    const result = schema.safeParse(data);
    if (!result.success) {
      return res.status(400).json({ error: 'ValidationError', details: result.error.flatten() });
    }
    (req as any).parsed = result.data;
    next();
  };
