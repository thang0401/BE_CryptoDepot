import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;
 
  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  googleID?: string;
}
