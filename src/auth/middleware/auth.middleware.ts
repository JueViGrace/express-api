import { body, checkExact } from 'express-validator';
import validationMiddleware from '../../shared/middleware/validation.middleware';

export const validateLogin = [
  body('username')
    .isString()
    .notEmpty()
    .withMessage('Username must not be empty'),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password must not be empty'),
  checkExact(),
  validationMiddleware.handleValidationErrors,
];
