import stripe from "stripe";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { getRepository, Repository } from "typeorm";
// import { Lazy } from "../../lib/helpers";
import { IContext } from "../../lib/interfaces";
import { config } from "../../config";
// import { Permission } from "../Permission";
import { Product } from "../Product";
import { User } from "./entity";

/**
 * UserResolver for graphql
 */
@Resolver((returns: void) => User)
export class UserResolver {
  private userRepo: Repository<User> = getRepository(User);
  // private productRepo: Repository<Product> = getRepository(Product);
  // Workaround waiting for
  // https://github.com/19majkel94/type-graphql/issues/351
  @Authorized()
  @FieldResolver((returns: void) => String, { nullable: true })
  public isSuperAdmin(
    @Root() user: User,
    @Ctx() context: IContext
  ): boolean | undefined {
    const curUser = context.state.user;
    if (curUser && user.id === curUser.id) {
      return user.isSuperAdmin;
    }

    return undefined;
  }

  @Query((returns: void) => User, { nullable: true })
  public getUserById(@Arg("id") id: string): Promise<User | undefined> {
    return this.userRepo.findOne(id);
  }

  @Query((returns: void) => User, { nullable: true })
  public getUserBySub(@Arg("sub") sub: string): Promise<User | undefined> {
    return this.userRepo.findOne({ sub });
  }

  // Workaround waiting for
  // https://github.com/19majkel94/type-graphql/issues/351
  // @Authorized()
  // @FieldResolver((returns: void) => String, { nullable: true })
  // public permissions(
  //   @Root() user: User,
  //   @Ctx() context: IContext
  // ): Lazy<Permission[]> | undefined {
  //   const curUser = context.state.user;
  //
  //   if (curUser && user.id === curUser.id) {
  //     return user.permissions;
  //   }
  //
  //   return undefined;
  // }

  @Authorized()
  @Mutation((returns: void) => [Product])
  public async addToFavorites(@Arg("productId") productId: string, @Ctx() context: IContext) {
    const user = context.state.user;
    if (user === undefined) {
      return [];
    }
    await User.createQueryBuilder().relation("favorites").of(user).add(productId);

    // Since favorites are lazy loaded we can use the old user object
    return user.favorites;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async setPaymentSource(
    @Ctx() context: IContext,
    @Arg("token", { description: "Stripe payment token." }
  ) source: string): Promise<boolean> {
    const user = context.state.user;
    if (!user) {
      return false;
    }
    const stripeApp = new stripe(config.STRIPE_PRIVATE_TOKEN);
    const customer = await stripeApp.customers.create({
      source
    });
    await User.update(user.id, { customerId: customer.id });

    return true;
  }

  @Query((returns: void) => User, { name: `me`, nullable: true })
  protected async me(@Ctx() context: IContext) {
    const user: User | undefined = context.state.user;
    if (!user) {
      return undefined;
    }

    return user;
  }
}

