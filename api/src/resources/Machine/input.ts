import { Field, InputType } from "type-graphql";
import { Machine } from "./entity";

/**
 * Input for creating a machine
 */
@InputType()
export class MachineCreateInput implements Partial<Machine> {
  @Field()
  public shortName: string;

  @Field()
  public latitude: number;

  @Field()
  public longitude: number;
}
