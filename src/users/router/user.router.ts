import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import {
  validateUserRequest,
  validateUpdateUserRequest,
} from '../middlewares/user.middleware';
import { validateIdParam } from '../../shared/middleware/validation.middleware';

const router = Router();

router.get('/', UsersController.getUsers);

router.get('/:id', validateIdParam, UsersController.getUserById);

router.post('/create', validateUserRequest, UsersController.createUser);

router.patch(
  '/:id',
  validateIdParam,
  validateUpdateUserRequest,
  UsersController.updateUser,
);

router.delete('/:id', validateIdParam, UsersController.deleteUser);

export default router;
