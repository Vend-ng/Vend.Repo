import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import { getRepository, Repository } from "typeorm";
// import { Lazy } from "../../lib/helpers";

import { IContext, PaginateInput } from "../../lib/interfaces";
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
    @Ctx() context: IContext,
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ) {
    const user = context.state.user;
    if (user === undefined) {
      return [];
    }

    return Order.createQueryBuilder("order")
      .where("order.user = :userId", { userId: user.id })
      .andWhere("order.finished = false")
      .andWhere("expires > :currentDatetime", { currentDatetime: new Date() })
      .skip(skip)
      .take(take)
      .getMany();
  }

  @Authorized("order:view:completed")
  @Query(() => [Order], { description: "Get completed orders." })
  public async getCompletedOrders(
    @Ctx() context: IContext,
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ) {
    const user = context.state.user;
    if (user === undefined) {
      return [];
    }

    return Order.createQueryBuilder("order")
      .where("order.user = :userId", { userId: user.id })
      .andWhere("order.finished = true")
      .skip(skip)
      .take(take)
      .getMany();
  }

  // NOTE: Needs rate limitting to prevent spamming codes until correct
  @Authorized("order:complete")
  @Mutation(() => Order, { description: "Complete an order with an order code." })
  public async completeOrder(
    @Arg("orderCode") orderCode: string,
    @Arg("machine") machineId: string,
    @Ctx() context: IContext
  ) {
    // TODO: Get machine from the current state if application is a machine instead
    return Order.createQueryBuilder()
      .relation("machine")
      .of(machineId)
      .select("order")
      .where("order.finished = FALSE")
      .andWhere("code = :orderCode", { orderCode }).getOne();
    // const stripeCode = order.orderId;
    // TODO: Check stripe order status
    // return order;
  }
}
