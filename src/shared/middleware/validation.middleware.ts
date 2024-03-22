import { NextFunction, Request, Response } from 'express';
import { param, query, validationResult } from 'express-validator';
import httpResponse from '../response/http.response';

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return httpResponse.BadRequest(res, errors.array());
  }

  next();
};

export const validateIdParam = [
  param('id')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('id paramenter must be a valid string'),
  handleValidationErrors,
];

export default {
  handleValidationErrors,
  validateIdParam,
};

export const validateQueryParams = [
  query('page')
    .isInt({ min: 1 })
    .withMessage('Page query param must be an integer and greater than 0')
    .optional(),
  query('selectedCategories')
    .isString()
    .withMessage('Selected categories query param must be a string')
    .optional(),
  query('searchQuery')
    .isString()
    .withMessage('Search query param must be a string')
    .optional(),
  query('sortOption')
    .isString()
    .withMessage('Sort option query param must be a string')
    .optional(),
  query('sortAs')
    .isString()
    .withMessage('Sort as query param must be a string')
    .toUpperCase()
    .matches('DESC' || 'ASC')
    .withMessage("Sort as query param must match: 'DESC' or 'ASC'")
    .optional(),
  handleValidationErrors,
];
