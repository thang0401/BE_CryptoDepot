import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  queryUser() {
    return this.userService.findAll();
  } 
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  user(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return this.userService.createUser(createUserInput);
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeUser(@Args('id') id: string) {
    return this.userService.removeUser(id);
  }
}
