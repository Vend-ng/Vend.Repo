import {
  Authorized,
  Field,
  ObjectType
} from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn
} from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Permission } from "../Permission";
import { User } from "../User";

/**
 * Group for users to belong to to generalize permissions
 */
@Entity()
@ObjectType({ description: "Groups for users to participate in." })
export class Group extends BaseEntity {
  @Field()
  @PrimaryColumn()
  public name: string;

  @Authorized("groups:view_users")
  @Field(() => [User], { description: "Users in this group." })
  @ManyToMany(() => User, (user: User) => user.groups, {
    lazy: true
  })
  public users: User[];

  @Field(() => [Permission], { description: "Permissions a group grants." })
  @ManyToMany(() => Permission, (permission: Permission) => permission.groups, {
    lazy: true,
    onDelete: "RESTRICT"
  })
  @JoinTable()
  public permissions: Lazy<Permission[]>;
}
