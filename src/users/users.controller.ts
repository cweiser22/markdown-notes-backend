import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
