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
// import { Lazy } from "../../lib/helpers";
import { config } from "../../config";
import { IContext } from "../../lib/interfaces";
// import { Permission } from "../Permission";
import { Product } from "../Product";
import { User } from "./entity";

/**
 * User resolver for getting user related queries, mutations, and fields.
 */
@Resolver(() => User)
export class UserResolver {
  // private productRepo: Repository<Product> = getRepository(Product);
  // Workaround waiting for
  // https://github.com/19majkel94/type-graphql/issues/351
  @Authorized()
  @FieldResolver(() => String, {
    description: "Whether a user is a super admin or not.",
    nullable: true
  })
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

  @Query(() => User, {
    description: "Get a user by their id.",
    nullable: true
  })
  public getUserById(@Arg("id") id: string): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => User, {
    description: "Get a user by their sub field from the auth platform.",
    nullable: true
  })
  public getUserBySub(@Arg("sub") sub: string): Promise<User | undefined> {
    return User.findOne({ sub });
  }

  @Authorized()
  @Mutation(() => [Product], { description: "Add product to user's favorites." })
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
  @Mutation(() => Boolean, { description: "Set the Stripe payment source token." })
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

  @Query(() => User, {
    description: "Get current user.",
    nullable: true
  })
  protected async me(@Ctx() context: IContext) {
    const user: User | undefined = context.state.user;
    if (!user) {
      return undefined;
    }

    return user;
  }
}

