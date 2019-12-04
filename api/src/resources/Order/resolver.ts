import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
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
@Resolver(() => Order)
export class OrderResolver {
  private orderRepo: Repository<Order> = getRepository(Order);
  private machineRepo: Repository<Machine> = getRepository(Machine);
  private productRepo: Repository<Product> = getRepository(Product);

  @Authorized("order:create")
  @Mutation(() => Order, { description: "Create a new order" })
  public async placeOrder(
    @Arg("order") orderData: CreateOrderInput,
    @Ctx() context: IContext
  ) {
    const stripeOrderId = `test ${Math.floor(Math.random() * 9999).toString()}`;
    const machine = await this.machineRepo.findOneOrFail({id: orderData.machineId});
    const products = await this.productRepo.findByIds(orderData.productIds);
    const order = this.orderRepo.create({
      // Defaults 2 hours in the future
      expires: orderData.expiration || new Date(Date.now() + 7200000),
      machine,
      orderId: stripeOrderId,
      products,
      user: context.state.user
    });

    return order.save();
  }

  @Authorized("order:view:pending")
  @Query(() => [Order], { description: "Get incomplete orders." })
  public async getPendingOrders(
    @Ctx() context: IContext
  ) {
    const user = context.state.user;
    if (user === undefined) {
      return [];
    }

    return Order.createQueryBuilder("order")
      .where("order.user = :userId", { userId: user.id })
      .andWhere("order.finished = false")
      .andWhere("expires > :currentDatetime", { currentDatetime: new Date() })
      .getMany();
  }

  @Authorized("order:view:completed")
  @Query(() => [Order], { description: "Get completed orders." })
  public async getCompletedOrders(
    @Ctx() context: IContext
  ) {
    const user = context.state.user;
    if (user === undefined) {
      return [];
    }

    return Order.createQueryBuilder("order")
      .where("order.user = :userId", { userId: user.id })
      .andWhere("order.finished = true")
      .getMany();
  }
}
