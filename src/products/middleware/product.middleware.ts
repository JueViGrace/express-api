import { body, checkExact } from 'express-validator';
import validation from '../../shared/middleware/validation.middleware';

export const validateProductRequest = [
  body('productName')
    .isString()
    .withMessage('productName must be a string')
    .notEmpty()
    .withMessage('productName must not be empty'),
  body('description')
    .isString()
    .withMessage('description must be a string')
    .notEmpty()
    .withMessage('description must not be empty'),
  body('reference')
    .isString()
    .withMessage('reference must be a string')
    .notEmpty()
    .withMessage('reference must not be empty'),
  body('price')
    .isNumeric()
    .withMessage('price must be a number')
    .notEmpty()
    .withMessage('price must not be empty'),
  body('category')
    .isString()
    .withMessage('category must be a string')
    .notEmpty()
    .withMessage('category must not be empty'),
  checkExact(),
  validation.handleValidationErrors,
];

export const validateUpdateProductRequest = [
  body('productName')
    .isString()
    .notEmpty()
    .withMessage('productName must be a string and must not be empty')
    .optional(),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('description must be a string and must not be empty')
    .optional(),
  body('price')
    .isNumeric()
    .withMessage('price must be a number')
    .notEmpty()
    .withMessage('price must not be empty')
    .optional(),
  body('category')
    .isString()
    .withMessage('category must be a string')
    .notEmpty()
    .withMessage('category must not be empty')
    .optional(),
  checkExact(),
  validation.handleValidationErrors,
];
