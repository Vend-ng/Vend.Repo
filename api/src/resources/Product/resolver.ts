import { Authorized, Query, Resolver } from "type-graphql";
import { Product } from "../Product";

import { getRepository, Repository } from "typeorm";

/**
 * ProductResolver for products
 */
@Resolver((returns: void) => Product)
export class ProductResolver {
  private productRepo: Repository<Product> = getRepository(Product);

  @Authorized()
  @Query((returns: void) => [Product])
  public async products(): Promise<Product[]> {
    return this.productRepo.find();
  }
}
