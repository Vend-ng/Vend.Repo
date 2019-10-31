import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Machine } from "./";

import { getRepository, Repository } from "typeorm";

/**
 * MachineResolver for machines
 */
@Resolver((returns: void) => Machine)
export class MachineResolver {
  private machineRepo: Repository<Machine> = getRepository(Machine);

  @Authorized()
  @Query((returns: void) => [Machine])
  public async nearbyMachines(
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("radius") radius: number
  ): Promise<Machine[]> {
    return this.machineRepo.find();
  }
}
