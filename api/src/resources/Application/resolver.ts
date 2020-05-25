import { Args, Authorized, Query, Resolver } from "type-graphql";
import { PaginateInput } from "../../lib/interfaces";
import { Application } from "./";

/**
 * ApplicationResolver for machine products
 */
@Resolver(() => Application)
export class ApplicationResolver {
  @Authorized("application:view")
  @Query(() => [Application], { description: "Get all applications." })
  public async applications(
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ): Promise<Application[]> {
    return Application.find({
      skip,
      take
    })
  }
}
