import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../app/config/db/base.entity';
import { OrderItemEntity } from '../../../orders/models/entities/order-item.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @Column()
  productName: string;

  @Column()
  reference: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 24, scale: 4 })
  price: number;

  @Column()
  category: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];
}
