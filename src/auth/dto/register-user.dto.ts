import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  id : string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsString()
  googleID?: string;
}
