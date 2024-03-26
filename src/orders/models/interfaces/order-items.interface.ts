import { ProductEntity } from '../../../products/models/entities/product.entity';
import { OrderEntity } from '../entities/order.entity';

export interface OrderItem {
  quantity: number;
  price: number;
  order: OrderEntity;
  product: ProductEntity;
}
