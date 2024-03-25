import { Router } from 'express';
import usersRouter from '../../users/router/user.router';
import productRouter from '../../products/router/product.router';
import authRouter from '../../auth/router/auth.router';
import authMiddleware from '../../shared/middleware/auth.middleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', authMiddleware.passAuth('jwt'), usersRouter);
router.use('/products', productRouter);
// router.use('/orders')
// router.use('/customer')
// router.use('/categories')

export default router;
