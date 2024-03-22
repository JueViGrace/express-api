import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import {
  validateUpdateUserRequest,
  validateUserRequest,
} from '../middlewares/user.middleware';
import {
  validateIdParam,
  validateQueryParams,
} from '../../shared/middleware/validation.middleware';

const router = Router();

router.get('/', validateQueryParams, UsersController.getUsers);

router.get('/:id', validateIdParam, UsersController.getUserById);

// router.post('/create', validateUserRequest, UsersController.createUser);

router.patch(
  '/update/:id',
  validateIdParam,
  validateUpdateUserRequest,
  UsersController.updateUser,
);

router.delete('/delete/:id', validateIdParam, UsersController.deleteUser);

export default router;
