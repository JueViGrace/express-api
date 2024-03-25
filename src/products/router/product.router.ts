import { Router } from 'express';
import productController from '../controllers/product.controller';
import {
  validateProductRequest,
  validateUpdateProductRequest,
} from '../middleware/product.middleware';
import {
  validateIdParam,
  validateQueryParams,
} from '../../shared/middleware/validation.middleware';
import authMiddleware from '../../shared/middleware/auth.middleware';

const router = Router();

router.get('/', validateQueryParams, productController.getProducts);

router.get('/:id', validateIdParam, productController.getProductById);

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
  validateIdParam,
  validateUpdateProductRequest,
  productController.updateProduct,
);

router.delete(
  '/delete/:id',
  authMiddleware.passAuth('jwt'),
  authMiddleware.checkAdminRole,
  validateIdParam,
  productController.deleteProduct,
);

export default router;
