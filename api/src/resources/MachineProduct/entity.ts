import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Machine } from '../Machine';
import { Product } from '../Product';

import { Field, ID, ObjectType } from 'type-graphql';

/**
 * Machine which hosts products
 */
@ObjectType()
@Entity()
export class MachineProduct extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field()
  @Column()
  public quantity: number;

  @Field((returns: void) => Product)
  @ManyToOne(
    (returns: void) => Product,
    (product: Product) => product.machineProducts
  )
  public product: Product;

  @ManyToOne(
    (returns: void) => Machine,
    (machine: Machine) => machine.products,
    {
      lazy: true
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
