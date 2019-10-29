import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Machine } from '../Machine';
import { MachineProduct } from "./";

import { getRepository, Repository } from "typeorm";

/**
 * MachineProductResolver for machine products
 */
@Resolver((returns: void) => MachineProduct)
export class MachineProductResolver {
  private machineProductRepo: Repository<MachineProduct> = getRepository(MachineProduct);
  private machineRepo: Repository<Machine> = getRepository(Machine);

  @Authorized()
  @Query((returns: void) => [MachineProduct])
  public async getMachineProducts(@Arg("machineid") machineId: string): Promise<MachineProduct[]> {
    const machine = this.machineRepo.findOne(machineId);

    return this.machineProductRepo.find({ machine });
  }
}
