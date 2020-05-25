import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { Lazy } from "../../lib/helpers";
import { Application } from "../Application";
import { Group } from "../Group";
import { User } from "../User";

/**
 * Permission, typically single resource permission, but just a name.
 */
@ObjectType()
@Entity()
export class Permission extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public name: string;

  @Field(() => [Group], { defaultValue: [] })
  @ManyToMany(() => Group, (group: Group) => group.permissions, {
    lazy: true
  })
  public groups: Lazy<Group[]>;

  @Field(() => [User], { defaultValue: [] })
  @ManyToMany(() => User, (user: User) => user.permissions, {
    lazy: true,
    onDelete: "RESTRICT"
  })
  public users: Lazy<User[]>;

  @ManyToMany(() => Application, (application: Application) => application.permissions, {
    lazy: true
  })
  public applications: Lazy<Application[]>;
}
