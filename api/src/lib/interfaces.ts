import { Max, Min } from "class-validator";
import { ParameterizedContext } from "koa";
import { ArgsType, Field, InputType, Int } from "type-graphql";
import { User } from "../resources/User";

export interface IContext extends ParameterizedContext {
  state: {
    user?: User;
    scope?: string;
  };
}

export interface IUserInfo {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
}

/**
 * Pagination input for offset and limit
 */
@ArgsType()
@InputType({
  description: "Basic pagination arguments."
})
export class PaginateInput {
  @Field(() => Int, {
    defaultValue: 100,
    description: "The number of results to keep."
  })
  @Min(0)
  @Max(100)
  public limit?: number;

  @Field(() => Int, {
    defaultValue: 0,
    description: "The index or starting point to being taking results."
  })
  @Min(0)
  public offset?: number;
}
