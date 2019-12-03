import { Max, Min } from "class-validator";
import { ParameterizedContext } from "koa";
import { ArgsType, Field, InputType } from "type-graphql";
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
@InputType()
export class PaginateInput {
  @Field({ defaultValue: 100 })
  @Min(0)
  @Max(100)
  public limit?: number;

  @Field({ defaultValue: 0 })
  @Min(0)
  public offset?: number;
}
