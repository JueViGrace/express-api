import { Router } from 'express';
import productController from '../controllers/product.controller';
import {
  validateProductRequest,
  validateUpdateProductRequest,
} from '../middleware/product.middleware';
import { validateIdParam, validateQueryParams } from '../../shared/middleware/validation.middleware';

const router = Router();

router.get('/', validateQueryParams, productController.getProducts);

router.get('/:id', validateIdParam, productController.getProductById);

router.post('/create', validateProductRequest, productController.createProduct);

router.patch(
  '/update/:id',
  validateIdParam,
  validateUpdateProductRequest,
  productController.updateProduct,
);

router.delete('/delete/:id', validateIdParam, productController.deleteProduct);

export default router;
