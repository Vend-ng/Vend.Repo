import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from "type-graphql";
import { Product } from "../Product";
import { IContext } from "../../lib/interfaces";
import { ProductCreateInput } from "./input";

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

  @Authorized()
  @Mutation((returns: void) => Product)
  public async createProduct(
    @Arg("inputProduct", (argType: void) => ProductCreateInput) inputProduct: DeepPartial<Product>,
    @Ctx() context: IContext
  ): Promise<Product> {
    const machineOwners = [context.state.user];
    const product = this.productRepo.create({
      item: null, 
      imageUrl: null,
      owners: machineOwners,
      displayName: null,
      description: null,
      machineProducts: [],
      statementDescriptor: null,
      price: null,
      categories: null
    });

    return product.save();
  }

}
