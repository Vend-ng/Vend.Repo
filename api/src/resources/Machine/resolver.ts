import { validateOrReject } from "class-validator";
import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { IContext, PaginateInput } from "../../lib/interfaces";
import { Machine, MachineCreateInput } from "./";

/**
 * MachineResolver for machines
 */
@Resolver(() => Machine)
export class MachineResolver {
  @Authorized()
  @Query(() => [Machine], {
    complexity: 50,
    description: "Get machines within a radius around a specific latitude and longitude."
  })
  public async nearbyMachines(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("radius", {
      defaultValue: 5000,
      description: "Radius, in meters, to look for machines."
    }) radius: number,
    @Args(() => PaginateInput, { validate: true }) { skip, take }: PaginateInput
  ): Promise<Machine[]> {
    // NOTE: Can use regular sql with lateral join to add distance or an extra select
    // If so, might be useful to add sorting, and limit, and skip
    return Machine.createQueryBuilder("machine")
      .where(
        "earth_box(ll_to_earth(:latitude, :longitude), sec_to_gc(:radius)) @> ll_to_earth(machine.latitude, machine.longitude)",
        { latitude, longitude, radius }
      )
      .skip(skip)
      .take(take)
      .getMany();
  }

  @Authorized("create:machine")
  @Mutation(() => Machine, { description: "Create a machine" })
  public async createMachine(
    @Arg("machine", () => MachineCreateInput) machineInput: MachineCreateInput,
    @Ctx() context: IContext
  ): Promise<Machine> {
    await validateOrReject(machineInput);
    const machine = new Machine();
    machine.shortName = machineInput.shortName;
    machine.locationDescription = machineInput.shortName;
    machine.latitude = machineInput.latitude;
    machine.longitude = machineInput.longitude;

    const user = context.state.user!;
    machine.owners = [user];

    return machine.save();
  }
}
