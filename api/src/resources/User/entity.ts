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
import { Application } from "../Application";
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
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  // Google subject id
  @Field(() => String)
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

  @Field(() => [Permission], { nullable: true })
  @JoinTable()
  @ManyToMany(() => Permission, (permission: Permission) => permission.users, {
    lazy: true
  })
  public permissions: Lazy<Permission[]>;

  @ManyToMany(() => Group, (group: Group) => group.users, {
    lazy: true
  })
  @JoinTable()
  public groups: Lazy<Group[]>;

  @Column({ unique: true, nullable: true })
  @Index({ unique: true })
  public customerId?: string;

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order: Order) => order.user, {
    lazy: true
  })
  @JoinTable()
  public orders: Lazy<Order[]>;

  @Field(() => [Machine], { nullable: true })
  @ManyToMany(() => Machine, (machine: Machine) => machine.owners, {
    lazy: true
  })
  @JoinTable()
  public machinesOwned: Lazy<Machine[]>;

  @Field(() => [Product], { nullable: true })
  @ManyToMany(() => Product, (product: Product) => product.owners, {
    lazy: true
  })
  @JoinTable()
  public productsOwned: Lazy<Product[]>;

  @Field(() => [Product], { defaultValue: [] })
  @ManyToMany(() => Product, (product: Product) => product.favoritedBy, {
    lazy: true
  })
  @JoinTable()
  public favorites: Lazy<Product[]>;

  @OneToMany(() => Application, (application: Application) => application.user, {
    lazy: true
  })
  @JoinTable()
  public applications: Lazy<Application[]>;
}
