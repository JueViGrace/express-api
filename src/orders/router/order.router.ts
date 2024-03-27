import { Router } from 'express';
import orderController from '../controllers/order.controller';
import authMiddleware from '../../shared/middleware/auth.middleware';
import {
  checkOrderData,
  validateOrderRequest,
  validateUpdateOrderRequest,
} from '../middlewares/order.middleware';
import validationMiddleware from '../../shared/middleware/validation.middleware';

const router = Router();

router.get('/', orderController.getOrders);

router.get(
  '/:id',
  validationMiddleware.validateIdParam,
  checkOrderData,
  orderController.getOrderById,
);

router.post('/create', validateOrderRequest, orderController.createOrder);

router.patch(
  '/update/:id',
  authMiddleware.checkAdminRole,
  validationMiddleware.validateIdParam,
  validateUpdateOrderRequest,
  orderController.updateOrder,
);

router.delete(
  '/delete/:id',
  authMiddleware.checkAdminRole,
  validationMiddleware.validateIdParam,
  orderController.deleteOrder,
);

export default router;
