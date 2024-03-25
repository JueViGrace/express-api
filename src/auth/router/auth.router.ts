import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../../shared/middleware/auth.middleware';
import { validateUserRequest } from '../../users/middlewares/user.middleware';
import { validateLogin } from '../middleware/login.middleware';

const router = Router();

router.post(
  '/login',
  validateLogin,
  authMiddleware.passAuth('login'),
  AuthController.login,
);

router.post('/signup', validateUserRequest, AuthController.signUp);

export default router;
