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
export class Group extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @ManyToMany(
    (group: void) => User,
    (user: User) => user.groups, {
      lazy: true
    }
  )
  public users: User;

  @ManyToMany(
    (returns: void) => Permission,
    (permission: Permission) => permission.groups, {
      lazy: true,
      onDelete: "RESTRICT"
    }
  )
  @JoinTable()
  public permissions: Lazy<Permission[]>;
}
