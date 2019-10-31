import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  UpdateDateColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Machine } from '../Machine';
import { Product } from '../Product';

import { Field, Int, ObjectType } from 'type-graphql';

/**
 * Machine which hosts products
 */
@ObjectType()
@Entity()
export class MachineProduct extends BaseEntity {
  @Field((returns: void) => Int)
  @Column({ default: 0 })
  public quantity: number;

  @Field((returns: void) => Product)
  @ManyToOne(
    (returns: void) => Product,
    (product: Product) => product.machineProducts,
    {
      lazy: true,
      primary: true
    }
  )
  public product: Lazy<Product>;

  @ManyToOne(
    (returns: void) => Machine,
    (machine: Machine) => machine.products,
    {
      lazy: true,
      primary: true
    }
  )
  public machine: Lazy<Machine>;

  @Field((returns: void) => Date, { nullable: true })
  @Index()
  @UpdateDateColumn()
  public readonly lastUpdated: Date;

  @Field((returns: void) => Date)
  @CreateDateColumn()
  public readonly createdAt: Date;
}
