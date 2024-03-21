import { body, checkExact } from 'express-validator';
import validation from '../../shared/middleware/validation.middleware';

export const validateUserRequest = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('name must be a string and must not be empty'),
  body('lastname')
    .isString()
    .notEmpty()
    .withMessage('lastname must be a string and must not be empty'),
  body('username')
    .isString()
    .notEmpty()
    .withMessage('username must be a string and must not be empty'),
  body('email')
    .isString()
    .notEmpty()
    .withMessage('email must be a string and must not be empty'),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('password must be a string and must not be empty'),
  checkExact(),
  validation.handleValidationErrors,
];

export const validateUpdateUserRequest = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('name must be a string and must not be empty')
    .optional(),
  body('lastname')
    .isString()
    .notEmpty()
    .withMessage('lastname must be a string and must not be empty')
    .optional(),
  body('username')
    .isString()
    .notEmpty()
    .withMessage('username must be a string and must not be empty')
    .optional(),
  body('email')
    .isString()
    .notEmpty()
    .withMessage('email must be a string and must not be empty')
    .optional(),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('password must be a string and must not be empty')
    .optional(),
  checkExact(),
  validation.handleValidationErrors,
];
