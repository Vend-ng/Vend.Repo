import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { IContext } from "../../lib/interfaces";
import { Machine, MachineCreateInput } from "./";

/**
 * MachineResolver for machines
 */
@Resolver((returns: void) => Machine)
export class MachineResolver {
  @Authorized()
  @Query((returns: void) => [Machine], { complexity: 50 })
  public async nearbyMachines(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("radius", {
      defaultValue: 5000,
      description: "Radius, in meters, to look for machines."
    }) radius: number
  ): Promise<Machine[]> {
    // NOTE: Can use regular sql with lateral join to add distance
    return Machine.createQueryBuilder("machine")
      .where(
        "earth_box(ll_to_earth(:latitude, :longitude), sec_to_gc(:radius)) @> ll_to_earth(machine.latitude, machine.longitude)",
        { latitude, longitude, radius }
      ).getMany();
  }

  @Authorized("create:machine")
  @Mutation((returns: void) => Machine)
  public async createMachine(@Arg("machine") machineInput: MachineCreateInput, @Ctx() context: IContext) {
    const user = context.state.user;
    if (user === undefined) {
      return undefined;
    }
    const machine = Machine.create(machineInput);
    machine.owners = [user];

    return machine.save();
  }
}
