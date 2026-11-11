import { NextFunction, Request, Response } from 'express';

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      res.status(403).json({ success: false, error: 'Permisos insuficientes' });
      return;
    }
    next();
  };
}
