import { Router } from 'express';
import productController from '../controllers/product.controller';
import {
  validateProductRequest,
  validateUpdateProductRequest,
} from '../middleware/product.middleware';
import { validateIdParam } from '../../shared/middleware/validation.middleware';

const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', validateIdParam, productController.getProductById);

// router.get('/', productController.searchProducts)

router.post('/create', validateProductRequest, productController.createProduct);

router.patch(
  '/:id',
  validateIdParam,
  validateUpdateProductRequest,
  productController.updateProduct,
);

router.delete('/:id', validateIdParam, productController.deleteProduct);

export default router;
