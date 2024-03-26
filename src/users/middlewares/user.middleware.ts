import { body, checkExact, checkSchema } from 'express-validator';
import validation from '../../shared/middleware/validation.middleware';
import { NextFunction, Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import userService from '../services/user.service';

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

const updateUserSchema = checkSchema(
  {
    name: {
      notEmpty: { errorMessage: 'name must not be empty' },
      isString: { errorMessage: 'name must be a string' },
      optional: true,
    },
    lastname: {
      notEmpty: { errorMessage: 'lastname must not be empty' },
      isString: { errorMessage: 'lastname must be a string' },
      optional: true,
    },
    username: {
      notEmpty: { errorMessage: 'username must not be empty' },
      isString: { errorMessage: 'username must be a string' },
      optional: true,
    },
    email: {
      notEmpty: { errorMessage: 'email must not be empty' },
      isString: { errorMessage: 'email must be a string' },
      isEmail: { errorMessage: 'email must be a valid email' },
      optional: true,
    },
    customer: {
      notEmpty: { errorMessage: 'customer must not be empty' },
      isObject: { errorMessage: 'customer must be an object' },
      optional: true,
    },
    'customer.id': {
      notEmpty: { errorMessage: 'id must not be empty' },
      isString: { errorMessage: 'id must be a string' },
      isUUID: { errorMessage: 'id must match uuid pattern' },
      optional: true,
    },
    'customer.city': {
      notEmpty: { errorMessage: 'city must not be empty' },
      isString: { errorMessage: 'city must be a string' },
      optional: true,
    },
    'customer.state': {
      notEmpty: { errorMessage: 'state must not be empty' },
      isString: { errorMessage: 'state must be a string' },
      optional: true,
    },
    'customer.dni': {
      notEmpty: { errorMessage: 'dni must not be empty' },
      isString: { errorMessage: 'dni must be a string' },
      optional: true,
    },
    'customer.address': {
      notEmpty: { errorMessage: 'address must not be empty' },
      isString: { errorMessage: 'address must be a string' },
      optional: true,
    },
    'customer.phoneNumber': {
      notEmpty: { errorMessage: 'phone number must not be empty' },
      isString: { errorMessage: 'phone number must be a string' },
      optional: true,
    },
  },
  ['body'],
);

export const validateUpdateUserRequest = [
  checkExact(updateUserSchema),
  validation.handleValidationErrors,
];

export const checkExistingData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id },
      body: { username, email },
    } = req;

    const errors: string[] = [];

    const existingUser = await userService.findUserById(id);

    if (!existingUser) {
      return httpResponse.NotFound(res, 'User not found');
    }

    if (username) {
      const validUsername = await userService.findUsernames(username);

      const valid = validUsername.filter((user) => user.id !== id);

      if (valid.length > 0) {
        errors.push('Username already in use.');
      }
    }

    if (email) {
      const validEmail = await userService.findEmails(email);

      const valid = validEmail.filter((user) => user.id !== id);

      if (valid.length > 0) {
        errors.push('Email already in use.');
      }
    }

    if (errors.length > 0) {
      return httpResponse.BadRequest(res, errors);
    }

    next();
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};
