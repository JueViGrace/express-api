import { Router } from 'express';
import usersRouter from '../../users/router/user.router';
import productRouter from '../../products/router/product.router';
import authRouter from '../../auth/router/auth.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productRouter);
// router.use('/orders')
// router.use('/customer')
// router.use('/categories')

export default router;
