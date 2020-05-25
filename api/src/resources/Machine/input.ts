import { Field, InputType } from "type-graphql";

/**
 * Input for creating a machine
 */
@InputType()
export class MachineCreateInput {
  @Field()
  public shortName: string;

  @Field()
  public latitude: number;

  @Field()
  public longitude: number;

  @Field()
  public locationDescription: string;

  @Field({ defaultValue: false })
  public supportsLetters?: boolean;
}
