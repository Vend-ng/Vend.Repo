import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
@Index("ORDER_CODE_UNIQUE_IF_NOT_FINISHED", { synchronize: false })
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.orders, {
    lazy: true
  })
  public user: Lazy<User>;

  @Column({ unique: true })
  public orderId: string;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product: Product) => product.purchases, {
    lazy: true
  })
  @JoinTable()
  public products: Lazy<Product[]>;

  @Field(() => Machine)
  @ManyToOne(() => Machine, (machine: Machine) => machine.orders, {
    lazy: true
  })
  public machine: Lazy<Machine>;

  @Field()
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

  @BeforeInsert()
  public createCode() {
    this.code = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  }
}
