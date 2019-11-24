import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Lazy } from "../../lib/helpers";
import { User } from "../User";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  @Generated("uuid")
  public token: string;

  @ManyToOne(() => User, (user: User) => user.applications, {
    lazy: true
  })
  public user: Lazy<User>;
}
