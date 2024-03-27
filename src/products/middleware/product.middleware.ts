import { NextFunction, Request, Response } from 'express';
import { body, checkExact } from 'express-validator';
import validation from '../../shared/middleware/validation.middleware';
import httpResponse from '../../shared/response/http.response';
import productService from '../services/product.service';

export const checkProductData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (id) {
      const existingProduct = await productService.getProductById(id);

      if (!existingProduct) {
        return httpResponse.NotFound(res, 'Product not found.');
      }
    }

    const { reference } = req.body;

    if (reference) {
      const validReference =
        await productService.findProductByReference(reference);

      const valid = validReference.filter((product) => product.id !== id);

      if (valid.length > 0) {
        return httpResponse.BadRequest(res, 'Reference already in use.');
      }
    }

    next();
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

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
  checkProductData,
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
  body('reference')
    .isString()
    .withMessage('reference must be a string')
    .notEmpty()
    .withMessage('reference must not be empty'),
  body('category')
    .isString()
    .withMessage('category must be a string')
    .notEmpty()
    .withMessage('category must not be empty')
    .optional(),
  checkExact(),
  validation.handleValidationErrors,
  checkProductData,
];
