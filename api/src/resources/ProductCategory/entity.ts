import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { Field, ObjectType } from "type-graphql";

import { Lazy } from "../../lib/helpers";
import { Product } from "../Product";

/**
 * Category/Tag for products
 */
@ObjectType()
@Entity()
export class ProductCategory extends BaseEntity {
  @Field()
  @PrimaryColumn()
  public name: string;

  @Field()
  @Column({ nullable: true })
  public description: string;

  @ManyToMany(
    (category: void) => Product,
    (product: Product) => product.categories,
    { lazy: true }
  )
  public products: Lazy<Product[]>;
}
