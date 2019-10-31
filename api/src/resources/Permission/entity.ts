import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Lazy } from "../../lib/helpers";
import { Group } from "../Group";
import { User } from "../User";

@ObjectType()
@Entity()
export class Permission extends BaseEntity {
  @Field((returns: void) => ID)
  @PrimaryColumn()
  public name: string;

  @ManyToMany((returns: void) => Group, (group: Group) => group.permissions, {
    lazy: true
  })
  public groups: Lazy<Group[]>;

  @Field((returns: void) => [User])
  @ManyToMany((returns: void) => User, (user: User) => user.permissions, {
    lazy: true,
    onDelete: "RESTRICT"
  })
  public users: Lazy<User[]>;
}