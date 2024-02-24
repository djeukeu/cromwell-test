/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';

const healthcheck = (_req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(healthcheck);
  } catch (error: any) {
    healthcheck.message = error;
    res.status(503).send();
  }
};

export default healthcheck;
