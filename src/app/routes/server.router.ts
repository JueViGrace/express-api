import { Router } from 'express';
import usersRouter from '../../users/router/user.router';
import productRouter from '../../products/router/product.router';
import authRouter from '../../auth/router/auth.router';
import orderRouter from '../../orders/router/order.router';
import authMiddleware from '../../shared/middleware/auth.middleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', authMiddleware.passAuth('jwt'), usersRouter);
router.use('/products', productRouter);
router.use('/orders', authMiddleware.passAuth('jwt'), orderRouter);

export default router;
