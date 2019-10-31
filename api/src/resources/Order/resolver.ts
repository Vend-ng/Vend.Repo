import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver
} from "type-graphql";
import { getRepository, Repository } from "typeorm";
// import { Lazy } from "../../lib/helpers";

import { IContext } from "../../lib/interfaces";
import { Machine } from "../Machine";
import { Product } from "../Product";
import { Order } from "./entity";
import { CreateOrderInput } from "./input";

// const resource = User;
// type resourceType = User;

/**
 * UserResolver for graphql
 */
@Resolver((returns: void) => Order)
export class OrderResolver {
  private orderRepo: Repository<Order> = getRepository(Order);
  private machineRepo: Repository<Machine> = getRepository(Machine);
  private productRepo: Repository<Product> = getRepository(Product);

  @Authorized()
  @Mutation((returns: void) => Order)
  public async placeOrder(
    @Arg("order") orderData: CreateOrderInput,
    @Ctx() context: IContext
  ) {
    const stripeOrderId = "test" + Math.floor(Math.random() * 9999).toString();
    const machine = await this.machineRepo.findOneOrFail({id: orderData.machineId});
    const products = await this.productRepo.findByIds(orderData.productIds);
    const order = this.orderRepo.create({
      code: Math.floor(Math.random() * 9999).toString(),
      expires: orderData.expiration,
      machine,
      orderId: stripeOrderId,
      products,
      user: context.state.user
    });

    return order.save();
  }
}
