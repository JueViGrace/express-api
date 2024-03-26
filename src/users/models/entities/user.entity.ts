import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../app/config/db/base.entity';
import { RoleTypes } from '../enums/role.type';
import { CustomerEntity } from '../../../customers/models/entities/customer.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  //   @Column()
  //   city: string;

  //   @Column()
  //   province: string;

  @Column({
    type: 'enum',
    enum: RoleTypes,
    nullable: false,
    default: RoleTypes.USER,
  })
  role: RoleTypes;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer: CustomerEntity;
}
