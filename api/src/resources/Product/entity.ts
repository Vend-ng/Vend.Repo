import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Item } from '../Item'
import { MachineProduct } from '../MachineProduct'
import { Order } from "../Order";
import { ProductCategory } from "../ProductCategory";
import { User } from "../User";

/**
 * Product, stored in vending machines owned by users
 */
@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Field((returns: void) => Item)
  @ManyToOne((returns: void) => Item, (item: Item) => item.products, {
    lazy: true
  })
  @JoinTable()
  public item: Lazy<Item>;

  @Column({
    default: "https://storage.cloud.google.com/snackhack/thumbnails/default.png"
  })
  public imageUrl: string;

  @ManyToMany(
    (returns: void) => User,
    (user: User) => user.productsOwned,
    { lazy: true }
  )
  public owners: Lazy<User[]>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description?: string;

  @OneToMany(
    (returns: void) => MachineProduct,
    (machineProduct: MachineProduct) => machineProduct.product
  )
  public machineProducts: MachineProduct[];

  // Only allow 17 characters as statementDescriptor is 22 characters max on
  // stripe and we artificially add 5 with 'VEND '
  @Field({ nullable: true })
  @Column({ nullable: true, length: 17 })
  public statementDescriptor?: string;

  @UpdateDateColumn()
  public readonly updatedDate: Date;

  @Field((returns: void) => String)
  @Column("money")
  public price: number;

  @ManyToMany(
    (order: void) => Order,
    (order: Order) => order.products, {
      lazy: true,
      onDelete: "RESTRICT"
    }
  )
  public purchases: Lazy<Order[]>;

  @Field((returns: void) => [ProductCategory], { defaultValue: [] })
  @ManyToMany(
    (category: void) => ProductCategory,
    (category: ProductCategory) => category.products, {
      cascade: true,
      lazy: true
    }
  )
  @JoinTable()
  public categories: Lazy<ProductCategory[]>;

  @Field((returns: void) => [User], { defaultValue: [] })
  @ManyToMany(
    (returns: void) => User,
    (user: User) => user.favorites, {
      cascade: true,
      lazy: true
    }
  )
  public favoritedBy: Lazy<User[]>;
}
