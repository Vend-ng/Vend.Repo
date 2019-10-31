
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Field, ID, ObjectType } from 'type-graphql';

import { Lazy } from '../../lib/helpers';
import { Machine } from "../Machine";
import { Product } from '../Product';
import { User } from '../User';

/**
 * Order Table
 * - id
 * - user_id
 * - item_id
 * - machine_id
 * - charge_id (from stripe, used for refunds and getting chargeback, fraud, etc)
 * - initiated: datetime
 * - expires: datetime
 * - code: (code to enter to dispense)
 */
@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Field((returns: void) => User)
  @ManyToOne((returns: void) => User, (user: User) => user.orders, {
    lazy: true
  })
  public user: Lazy<User>;

  @Column({ unique: true })
  public orderId: string;

  @Field((returns: void) => [Product])
  @ManyToMany(
    (returns: void) => Product,
    (product: Product) => product.purchases,
    { lazy: true }
  )
  @JoinTable()
  public products: Lazy<Product[]>;

  @Field((returns: void) => Machine)
  @ManyToOne(
    (returns: void) => Machine,
    (machine: Machine) => machine.orders,
    { lazy: true }
  )
  public machine: Lazy<Machine>;

  @CreateDateColumn()
  public readonly initiated: Date;

  @Field()
  @Column()
  public expires: Date;

  @Field()
  @Column({ default: false })
  public finished: boolean;

  @Field()
  @Column()
  public code: string;
}
