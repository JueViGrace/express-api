import { CustomerEntity } from '../../../customers/models/entities/customer.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export interface Order {
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  customer: CustomerEntity;
}
