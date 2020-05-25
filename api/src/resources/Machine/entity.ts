import {
  BaseEntity,
  Column,
  Entity,
  Index,
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
// Disable synchronizing index
@Index("MACHINE_EARTH_LOC_INDEX", { synchronize: false })
export class Machine extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field()
  @Column()
  public shortName: string;

  @Field(() => [User], { defaultValue: [] })
  @ManyToMany(() => User, (user: User) => user.machinesOwned, {
    lazy: true
  })
  @JoinTable()
  public owners: Lazy<User[]>;

  @Field({ description: "A text hint to describe the machine's location." })
  @Column()
  public locationDescription: string;

  @Field()
  @Column({ type: "float8" })
  public latitude: number;

  @Field()
  @Column({type: "float8"})
  public longitude: number;

  @Field({ description: "Whether the machine supports letter input." })
  @Column({ default: false })
  public supportsLetters: boolean;

  @Field(() => [MachineProduct], { defaultValue: [] })
  @OneToMany(() => MachineProduct, (machineProduct: MachineProduct) => machineProduct.product, {
    lazy: true
  })
  public products: Lazy<MachineProduct[]>;

  @Field(() => Order)
  @OneToMany(() => Order, (order: Order) => order.machine, {
    lazy: true
  })
  public orders: Lazy<Order[]>;
}
