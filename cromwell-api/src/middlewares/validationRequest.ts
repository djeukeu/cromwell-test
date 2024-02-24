import { validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';

// Schema validation request middleware
export const validationRequest = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ success: 0, code: 'INVALID_FIELD', message: result.array() });
  }
  next();
};
