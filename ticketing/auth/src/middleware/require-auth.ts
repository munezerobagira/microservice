import {Request, Response, NextFunction} from 'express';
import {NotAuthorizedException} from '../exceptions/not-authorized-exception';
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) throw new NotAuthorizedException();
  next();
}
