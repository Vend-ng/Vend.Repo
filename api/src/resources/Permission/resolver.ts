import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { PaginateInput } from "../../lib/interfaces";
import { Permission } from "./entity";
import { PermissionCreateInput } from "./input";

/**
 * Permissions resolver for graphql
 */
@Resolver(() => Permission)
export class PermissionResolver {
  @Authorized("SUPERADMIN")
  @Query(() => [Permission], { description: "Get all permissions." })
  public async permissions(
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ): Promise<Permission[]> {
    return Permission.find({
      skip,
      take
    })
  }

  @Authorized("SUPERADMIN")
  @Mutation(() => Permission, { description: "Create a new permission." })
  public async createPermission(
    @Arg("data", () => PermissionCreateInput) input: PermissionCreateInput
  ): Promise<Permission> {
    const permission = Permission.create(input);

    return permission.save();
  }
}
