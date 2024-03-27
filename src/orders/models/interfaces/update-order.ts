import { CustomerEntity } from '../../../customers/models/entities/customer.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export interface UpdateOrder {
  status?: OrderStatus;
  customer?: CustomerEntity;
}
