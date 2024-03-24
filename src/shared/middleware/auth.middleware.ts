import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../../users/models/entities/user.entity';
import { RoleTypes } from '../../users/models/enums/role.type';
import httpResponse from '../response/http.response';
import passport from 'passport';

const passAuth = (type: string) => {
  return passport.authenticate(type, {});
};

const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserEntity;

  if (!user.role || user.role !== RoleTypes.ADMIN) {
    return httpResponse.Forbidden(res, 'Forbidden resource.');
  }
  return next();
};

export default {
  passAuth,
  checkAdminRole,
};
