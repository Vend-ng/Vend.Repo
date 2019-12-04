import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Machine } from "../Machine";
import { MachineProduct } from "./";

/**
 * MachineProductResolver for machine products
 */
@Resolver(() => MachineProduct)
export class MachineProductResolver {
  @Authorized()
  @Query(() => [MachineProduct], { description: "Get a machine's products." })
  public async getMachineProducts(@Arg("machineid") machineId: string): Promise<MachineProduct[]> {
    const machine = Machine.findOne(machineId);

    return MachineProduct.find({ machine });
  }
}
