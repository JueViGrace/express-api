import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { checkExistingData, validateUpdateUserRequest } from '../middlewares/user.middleware';
import {
  validateIdParam,
  validateQueryParams,
} from '../../shared/middleware/validation.middleware';
import authMiddleware from '../../shared/middleware/auth.middleware';

const router = Router();

router.get(
  '/',
  authMiddleware.checkAdminRole,
  validateQueryParams,
  UsersController.getUsers,
);

router.get('/:id', validateIdParam, UsersController.getUserById);

router.patch(
  '/update/:id',
  authMiddleware.checkUser,
  validateIdParam,
  validateUpdateUserRequest,
  checkExistingData,
  UsersController.updateUser,
);

router.delete(
  '/delete/:id',
  authMiddleware.checkAdminRole,
  validateIdParam,
  UsersController.deleteUser,
);

export default router;
