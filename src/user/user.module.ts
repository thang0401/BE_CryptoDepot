import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Importing the User entity for TypeORM
  ],
  providers: [
    UserService,  // Providing UserService for dependency injection
    UserResolver, // Providing UserResolver for GraphQL
  ],
  controllers: [
    UserController,  // Providing UserController for RESTful API
  ],
  exports: [
    UserService,  // Exporting UserService so it can be used in other modules like AuthModule
  ],
})
export class UserModule {}
