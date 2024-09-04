import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/entity/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
