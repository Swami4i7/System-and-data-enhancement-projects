import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserCredentialsAttributes } from '../types/types';
import { AuthToken } from '../types/types';

interface AuthRequest extends Request {
  user?: UserCredentialsAttributes;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token= req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {   
    const decoded = verifyToken(token as string) as UserCredentialsAttributes;
    (req as AuthRequest).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;
    if (!user || typeof user.role !== 'string' || !roles.includes(user.role)) {
      res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
