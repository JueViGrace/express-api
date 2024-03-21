import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../app/config/db/base.entity';

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

  //   @ManyToOne(() => CategoryEntity, (category) => category.products)
  //   @JoinColumn({ name: 'category_id' })
  @Column()
  category: string;

  //   @OneToMany(
  //     () => PurchaseProductEntity,
  //     (purchaseProduct) => purchaseProduct.product,
  //   )
  //   purchaseProduct: PurchaseProductEntity[];
}
