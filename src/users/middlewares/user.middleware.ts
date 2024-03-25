import { body, checkExact, query } from 'express-validator';
import validation from '../../shared/middleware/validation.middleware';
import { NextFunction, Request, Response } from 'express';
import execRepository from '../../app/config/db/repository';
import { UserEntity } from '../models/entities/user.entity';

const userRepository = execRepository(UserEntity);

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

export const validateUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    params: { id },
    body,
  } = req;

  const query = {};

  

  const existingUser = (await userRepository).find({ where: [{ id: id }, {username: body.username}] });
};
