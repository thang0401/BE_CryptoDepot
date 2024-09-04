import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  // async validateUser(email: string, password: string): Promise<User> {
  //   const user = await this.userService.findByEmail(email);
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     return user;
  //   }
  //   throw new UnauthorizedException('Invalid credentials');
  // }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    console.log(email);
    console.log(password);
    console.log(user);
    if (!user) {
      
      throw new UnauthorizedException('Invalid email');
    }

    console.log(`Stored password hash: ${user.password}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    return this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
      googleID: registerUserDto.googleID || ''
    });
  }

  async validateGoogleUser(googleData: Partial<User>): Promise<User> {
    let user = await this.userService.findByGoogleId(googleData.googleID);
    if (!user) {
      const createUserInput: CreateUserInput = {
        id : googleData.googleID, 
        name: googleData.name || 'Default Name',
        password: googleData.password || 'default-password',
        email: googleData.email,
        googleID: googleData.googleID
        // Set other required fields with default values or data from googleData
      };

      user = await this.userService.createUser(createUserInput);
    }
    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
