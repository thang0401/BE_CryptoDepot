import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  //findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByGoogleId(googleID: string): Promise<User> {
    return this.userRepository.findOne({ where: { googleID } });
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(updateUserInput.id, updateUserInput);
    return this.findById(updateUserInput.id);
  }

  async removeUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
