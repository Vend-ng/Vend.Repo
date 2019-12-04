import { Authorized, Query, Resolver } from "type-graphql";
import { Product } from "../Product";

/**
 * ProductResolver for products
 */
@Resolver(() => Product)
export class ProductResolver {
  @Authorized()
  @Query(() => [Product], { description: "Get all products" })
  public async products(): Promise<Product[]> {
    return Product.find();
  }
}
