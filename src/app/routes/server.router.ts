import { Router } from 'express';
import usersRouter from '../../users/router/user.router';
import productRouter from '../../products/router/product.router';

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productRouter);
// router.use('/orders')
// router.use('/customer')
// router.use('/categories')
// router.use('/auth')

export default router;
