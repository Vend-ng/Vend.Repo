import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Group } from "../Group";
import { Machine } from '../Machine';
import { Order } from "../Order";
import { Permission } from "../Permission";
import { Product } from '../Product';

/**
 * User class
 */
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  // Google subject id
  @Field((returns: void) => String)
  @Index({ unique: true })
  @Column()
  public sub: string;

  @Field({ nullable: true })
  @Column({
    length: 50,
    nullable: true
  })
  public firstName?: string;

  @Field({ nullable: true })
  @Column({
    length: 50,
    nullable: true
  })
  public lastName?: string;

  @Field()
  @Column({
    unique: true
  })
  @Index({ unique: true })
  public email: string;

  @Field()
  @Column({ default: false })
  public emailVerified: boolean;

  @Field()
  @Column({ default: false })
  public isSuperAdmin: boolean;

  @Field()
  @CreateDateColumn()
  public readonly dateJoined: Date;

  @Field()
  @UpdateDateColumn()
  public readonly lastUpdated: Date;

  @Field((returns: void) => [Permission], { nullable: true })
  @JoinTable()
  @ManyToMany(
    (returns: void) => Permission,
    (permission: Permission) => permission.users,
    { lazy: true }
  )
  public permissions: Lazy<Permission[]>;

  @ManyToMany(
    (returns: void) => Group,
    (group: Group) => group.users, {
      lazy: true
    }
  )
  @JoinTable()
  public groups: Lazy<Group[]>;

  @Column({ unique: true, nullable: true })
  @Index({ unique: true })
  public customerId?: string;

  @Field((returns: void) => [Order], { nullable: true })
  @OneToMany(
    (returns: void) => Order,
    (order: Order) => order.user,
    {
      lazy: true
    }
  )
 @JoinTable()
  public orders: Lazy<Order[]>;

 @Field((returns: void) => [Machine], { nullable: true })
 @ManyToMany(
    (returns: void) => Machine,
    (machine: Machine) => machine.owners,
    {
      lazy: true
    }
  )
 @JoinTable()
  public machinesOwned: Lazy<Machine[]>;

  @Field((returns: void) => [Product], { nullable: true })
  @ManyToMany(
    (returns: void) => Product,
    (product: Product) => product.owners,
    {
      lazy: true
    }
  )
  @JoinTable()
  public productsOwned: Lazy<Product[]>;
}
