import { Router } from 'express';
import authMiddleware from '../../shared/middleware/auth.middleware';
import validationMiddleware from '../../shared/middleware/validation.middleware';
import UsersController from '../controllers/users.controller';
import {
  checkUserData,
  validateUpdateUserRequest,
} from '../middlewares/user.middleware';

const router = Router();

router.get(
  '/',
  authMiddleware.checkAdminRole,
  validationMiddleware.validateQueryParams,
  UsersController.getUsers,
);

router.get(
  '/:id',
  validationMiddleware.validateIdParam,
  checkUserData,
  UsersController.getUserById,
);

router.patch(
  '/update/:id',
  validationMiddleware.validateIdParam,
  authMiddleware.checkUser,
  validateUpdateUserRequest,
  UsersController.updateUser,
);

router.delete(
  '/delete/:id',
  authMiddleware.checkAdminRole,
  validationMiddleware.validateIdParam,
  checkUserData,
  UsersController.deleteUser,
);

export default router;
