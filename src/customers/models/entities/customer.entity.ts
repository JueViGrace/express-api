import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../app/config/db/base.entity';
import { UserEntity } from '../../../users/models/entities/user.entity';
import { OrderEntity } from '../../../orders/models/entities/order.entity';

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseEntity {
  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  state: string;

  @Column({ default: '' })
  dni: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  phoneNumber: string;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}
