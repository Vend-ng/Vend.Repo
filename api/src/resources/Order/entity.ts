import csprng from "csprng";
import {
  BaseEntity,
  BeforeInsert,
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
  public async createCode() {
    const machine = await this.machine;
    // Between 4 digits and 5 digit, bit length for 36 radix
    // 20.67 < (bits = 20) < 25.85
    let bits = 20;
    let radix = 36;
    if (!machine.supportsLetters) {
      // Between 4 and 5 digits (strictly less than 5) for 10 radix
      // 13.288 < x < (bits = 13) < 16.610
      bits = 13;
      radix = 10;
    }
    // This could be arguably weak if the probabilties of higher values aren't equal
    // Since we are limited by a string length, not bit length we need to truncate at decimal bit lengths
    // This means some higher values will never be generated, reducing the search space
    this.code = csprng(bits, radix);
  }
}
