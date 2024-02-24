/* eslint-disable @typescript-eslint/no-explicit-any */
import { verify, JwtPayload } from 'jsonwebtoken';
import config from 'src/config';

// Token validation middleware
export const authCheck = (req: any, res: any, next: any) => {
  type Payload = { id: string } & JwtPayload;
  const header = req.headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    try {
      const decoded = verify(token, config.secret_key as string) as Payload;
      req.userId = decoded.id;
    } catch (err) {
      return res.status(403).json({ success: 0, code: 'INVALID_TOKEN' });
    }
  } else {
    return res.status(401).json({ success: 0, code: 'NO_AUTH_TOKEN' });
  }
  next();
};
