import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { IContext } from "../../lib/interfaces";
import { Machine } from "./";

/**
 * MachineResolver for machines
 */
@Resolver((returns: void) => Machine)
export class MachineResolver {
  @Authorized()
  @Query((returns: void) => [Machine])
  public async nearbyMachines(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("radius") radius: number
  ): Promise<Machine[]> {
    // SELECT id,latitude,longitude,title FROM requests WHERE earth_box(ll_to_earth(40.689266, -74.044512), 5558) @> ll_to_earth(requests.latitude, requests.longitude);
    // NOTE: Can use regular sql with lateral join to add distance
    return Machine.createQueryBuilder()
      .where(
        "earth_box(ll_to_earth(machine.latitude, machine.longitude), :radius) @> ll_to_earth(:latitude, :longitude)",
        { latitude, longitude, radius }
      ).getMany();
  }

  @Authorized("create:machine")
  @Mutation((returns: void) => Machine)
  public async createMachine(@Arg("shortName") shortName: string, @Ctx() context: IContext) {
    const machine = new Machine();
    machine.shortName = shortName;
    machine.locationDescription = "";

    return machine.save();
  }
}
