import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Product } from "../Product";

/**
 * Item, base for a product
 */
@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @OneToMany((returns: void) => Product, (product: Product) => product.item, {
    lazy: true,
    onDelete: "RESTRICT"
  })
  public products: Lazy<Product[]>;

  @Field()
  @Column()
  public name: string;

  @Field((returns: void) => ID)
  @PrimaryColumn('varchar', { length: 14 })
  public gtin: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description?: string;

  @Field()
  @Column()
  public brand: string;
}
