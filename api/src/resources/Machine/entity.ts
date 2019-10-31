import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { MachineProduct } from '../MachineProduct';
import { Order } from "../Order";
import { User } from "../User";

import { Field, ID, ObjectType } from 'type-graphql';

/**
 * Machine which hosts products
 */
@ObjectType()
@Entity()
export class Machine extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field()
  @Column()
  public shortName: string;

  @Field((returns: void) => [User], { defaultValue: [] })
  @ManyToMany(
    (returns: void) => User,
    (user: User) => user.machinesOwned,
    {
      lazy: true
    }
  )
  @JoinTable()
  public owners: Lazy<User[]>;

  // A text hint to describe the machines location
  @Field()
  @Column()
  public locationDescription: string;

  // TODO: Actually store the location of the machine

  @Field((returns: void) => [MachineProduct], { defaultValue: [] })
  @OneToMany(
    (returns: void) => MachineProduct,
    (machineProduct: MachineProduct) => machineProduct.product,
    {
      lazy: true
    }
  )
  public products: Lazy<MachineProduct[]>;

  @Field((returns: void) => Order)
  @OneToMany(
    (returns: void) => Order,
    (order: Order) => order.machine,
    { lazy: true }
  )
  public orders: Lazy<Order[]>;
}
