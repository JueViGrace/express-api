import { Router } from 'express';
import authMiddleware from '../../shared/middleware/auth.middleware';
import validationMiddleware from '../../shared/middleware/validation.middleware';
import productController from '../controllers/product.controller';
import {
  checkProductData,
  validateProductRequest,
  validateUpdateProductRequest,
} from '../middleware/product.middleware';

const router = Router();

router.get(
  '/',
  validationMiddleware.validateQueryParams,
  productController.getProducts,
);

router.get(
  '/:id',
  validationMiddleware.validateIdParam,
  checkProductData,
  productController.getProductById,
);

router.post(
  '/create',
  authMiddleware.passAuth('jwt'),
  authMiddleware.checkAdminRole,
  validateProductRequest,
  productController.createProduct,
);

router.patch(
  '/update/:id',
  authMiddleware.passAuth('jwt'),
  authMiddleware.checkAdminRole,
  validationMiddleware.validateIdParam,
  validateUpdateProductRequest,
  productController.updateProduct,
);

router.delete(
  '/delete/:id',
  authMiddleware.passAuth('jwt'),
  authMiddleware.checkAdminRole,
  validationMiddleware.validateIdParam,
  checkProductData,
  productController.deleteProduct,
);

export default router;
