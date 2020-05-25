import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Lazy } from "../../lib/helpers";
import { Permission } from "../Permission";
import { User } from "../User";

/**
 * Application which allow user interaction
 */
@Entity()
@ObjectType({ description: "User created applications, which allow for automated user interaction." })
export class Application extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field({ description: "Token to use for authentication for this application, keep this secret." })
  @Column()
  @Generated("uuid")
  public token: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.applications, {
    lazy: true
  })
  public user: Lazy<User>;

  @Field(() => [Permission], { description: "Permissions an application has, typically a subset of the user's permissions." })
  @ManyToMany(() => Permission, (permission: Permission) => permission.applications, {
    lazy: true
  })
  public permissions: Lazy<Permission[]>;
}
