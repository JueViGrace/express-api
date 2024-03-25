import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { RoleTypes } from '../../users/models/enums/role.type';
import httpResponse from '../response/http.response';
import { PayloadToken } from '../../auth/interface/auth.interface';

const passAuth = (type: string) => {
  return passport.authenticate(type, {
    session: false,
  });
};

const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PayloadToken;

  if (!user.role || user.role !== RoleTypes.ADMIN) {
    return httpResponse.Forbidden(res, 'Forbidden resource.');
  }
  return next();
};

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PayloadToken;

  if (user.sub === req.params.id || user.role === RoleTypes.ADMIN) {
    return next();
  }
  return httpResponse.Forbidden(res, 'Forbidden resource.');
};

export default {
  passAuth,
  checkAdminRole,
  checkUser,
};
