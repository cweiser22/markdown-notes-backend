import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create({ email, password }: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = await argon2.hash(password);
    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }
}
