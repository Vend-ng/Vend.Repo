import { Args, Authorized, Query, Resolver } from "type-graphql";
import { PaginateInput } from "../../lib/interfaces";
import { Product } from "../Product";

/**
 * ProductResolver for products
 */
@Resolver(() => Product)
export class ProductResolver {
  @Authorized()
  @Query(() => [Product], { description: "Get all products" })
  public async products(
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ): Promise<Product[]> {
    return Product.find({
      skip,
      take
    })
  }
}
