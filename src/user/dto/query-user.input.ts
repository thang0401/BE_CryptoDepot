import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class QueryAllUser {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  gender: string;
  @Field({ nullable: true })
  country: string;
  @Field({ nullable: true })
  googleID: string;
}
