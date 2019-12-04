import { Arg, Args, Authorized, Query, Resolver } from "type-graphql";
import { PaginateInput } from "../../lib/interfaces";
import { Machine } from "../Machine";
import { MachineProduct } from "./";

/**
 * MachineProductResolver for machine products
 */
@Resolver(() => MachineProduct)
export class MachineProductResolver {
  @Authorized()
  @Query(() => [MachineProduct], { description: "Get a machine's products." })
  public async getMachineProducts(
    @Arg("machineid") machineId: string,
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ): Promise<MachineProduct[]> {
    return Machine.createQueryBuilder()
      .relation(MachineProduct, "machine")
      .of(machineId)
      .select()
      .skip(skip)
      .take(take)
      .getMany();
  }
}
