import { Router } from 'express';
import orderController from '../controllers/order.controller';
import authMiddleware from '../../shared/middleware/auth.middleware';

const router = Router();

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrderById);

router.post('/create', orderController.createOrder);

router.patch(
  '/update/:id',
  authMiddleware.checkAdminRole,
  orderController.updateOrder,
);

router.delete(
  '/delete/:id',
  authMiddleware.checkAdminRole,
  orderController.deleteOrder,
);

export default router;
