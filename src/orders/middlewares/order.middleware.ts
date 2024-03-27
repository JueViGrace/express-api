import { NextFunction, Request, Response } from 'express';
import { body, checkExact, checkSchema } from 'express-validator';
import { PayloadToken } from '../../auth/interface/auth.interface';
import customerService from '../../customers/services/customer.service';
import productService from '../../products/services/product.service';
import validationMiddleware from '../../shared/middleware/validation.middleware';
import httpResponse from '../../shared/response/http.response';
import { RoleTypes } from '../../users/models/enums/role.type';
import orderService from '../services/order.service';
import { PaymentMethod } from '../models/enums/payment-method.enum';
import { OrderStatus } from '../models/enums/order-status.enum';

export const checkOrderData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { customer, orderItems, paymentMethod, status } = req.body;
    const user = req.user as PayloadToken;
    const errors: string[] = [];

    if (customer) {
      if (user.role !== RoleTypes.ADMIN) {
        if (customer !== user.customerId) {
          return httpResponse.Forbidden(res, 'Forbidden resource.');
        }
      }

      if (id) {
        const existingOrder = await orderService.getOrderById(id, customer);

        if (!existingOrder) {
          errors.push('Order not found.');
        }
      }

      const existingCustomer = await customerService.findCustomerById(customer);

      if (!existingCustomer) {
        errors.push('Customer not found.');
      }

      const validCustomer =
        existingCustomer?.phoneNumber === '' ||
        existingCustomer?.address === '' ||
        existingCustomer?.city === '' ||
        existingCustomer?.dni === '' ||
        existingCustomer?.state === '';

      if (existingCustomer?.user === null) {
        return httpResponse.Forbidden(res, "Your're not a valid customer.");
      }

      if (validCustomer) {
        errors.push('You have not provided additional customer data.');
      }
    }

    if (paymentMethod) {
      const keys = Object.values(PaymentMethod);

      const payment = keys.filter((key) => key === paymentMethod);

      if (payment.length === 0) {
        errors.push('Incorrect payment method.');
      }
    }

    if (orderItems) {
      if (orderItems.length > 0) {
        for (const item of orderItems) {
          const product = await productService.getProductById(item.product);

          if (!product) {
            errors.push('Product not found.');
          }
        }
      }
    }

    if (status) {
      const keys = Object.values(OrderStatus);

      const payment = keys.filter((key) => key === status);

      console.log(keys);
      console.log(payment);

      if (payment.length === 0) {
        errors.push('Incorrect order status.');
      }
    }

    if (errors.length > 0) {
      return httpResponse.NotFound(res, errors);
    }

    next();
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const orderSchema = checkSchema(
  {
    paymentMethod: {
      notEmpty: { errorMessage: 'payment method must not be empty' },
      isString: { errorMessage: 'payment method must be a valid string' },
      toUpperCase: true,
    },
    customer: {
      notEmpty: { errorMessage: 'customer must not be empty' },
      isString: { errorMessage: 'customer must be a valid string' },
    },
    'customer.id': {
      notEmpty: { errorMessage: 'id must not be empty' },
      isString: { errorMessage: 'id must be a valid string' },
      isUUID: { errorMessage: 'id must match uuid pattern' },
    },
    orderItems: {
      notEmpty: { errorMessage: 'order items must not be empty' },
      isArray: { errorMessage: 'order items must be an array' },
    },
    'orderItems.*.price': {
      notEmpty: { errorMessage: 'price must not be empty' },
      isNumeric: { errorMessage: 'price must be a number' },
    },
    'orderItems.*.quantity': {
      notEmpty: { errorMessage: 'quatity must not be empty' },
      isNumeric: { errorMessage: 'quatity must be a number' },
    },
    'orderItems.*.product': {
      notEmpty: { errorMessage: 'prodcut must not be empty' },
      isString: { errorMessage: 'prodcut must be a valid string' },
      isUUID: { errorMessage: 'id prodcut match uuid pattern' },
    },
  },
  ['body'],
);

export const validateOrderRequest = [
  checkExact(orderSchema),
  validationMiddleware.handleValidationErrors,
  checkOrderData,
];

export const validateUpdateOrderRequest = [
  body('status')
    .isString()
    .notEmpty()
    .toUpperCase()
    .withMessage('status must not be empty and must be a valid string'),
  body('customer')
    .isString()
    .notEmpty()
    .isUUID()
    .withMessage('status must not be empty and must be a valid string'),
  checkExact(),
  validationMiddleware.handleValidationErrors,
];
