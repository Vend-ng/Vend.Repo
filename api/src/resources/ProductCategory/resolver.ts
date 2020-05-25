import { Authorized, Query, Resolver } from "type-graphql";
import { ProductCategory } from "./entity";

/**
 * ProductCategoryResolver for products
 */
@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  @Authorized()
  @Query(() => [ProductCategory], { description: "Get every product category" })
  public async productCategories(): Promise<ProductCategory[]> {
    return ProductCategory.find();
  }
}
