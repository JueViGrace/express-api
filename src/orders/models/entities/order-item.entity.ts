import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../../products/models/entities/product.entity';
import { OrderEntity } from './order.entity';
import { BaseEntity } from '../../../app/config/db/base.entity';

@Entity({ name: 'order_item' })
export class OrderItemEntity extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
