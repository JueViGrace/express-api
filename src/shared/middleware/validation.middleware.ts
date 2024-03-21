import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
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
