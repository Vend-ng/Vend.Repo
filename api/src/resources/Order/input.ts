import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOrderInput {
  @Field(() => [String])
  public productIds: string[];

  @Field()
  public machineId: string;

  @Field({ nullable: true })
  public expiration?: Date = new Date(Date.now() + 60 * 60 * 1000);
}
