import { Field, InputType, ObjectType } from "type-graphql";
import { Product } from "./entity";

@InputType()
export class ProductCreateInput implements Partial<Product> {
  // Base64 encoded image
  @Field()
  public imageFile: string;
}