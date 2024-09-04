import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entity/user.entity';
// import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthResponse } from './models/auth-response.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('registerUserInput') registerUserDto: RegisterUserDto) {
    const user = await this.authService.registerUser(registerUserDto);
    const token = await this.authService.login(user);
    return { user, token };
  }

  // @Mutation(() => AuthResponse)
  // async login(@Args('loginUserInput') loginUserDto: LoginUserDto) {
  //   const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
  //   const token = await this.authService.login(user);
  //   return { user, token };
  // }
}
