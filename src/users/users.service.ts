import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Users } from './users.entity';
import { CreateUserDto } from './dto';
import { hashPassword } from '../common/app-helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
  ) {}

  async createUser(dto: CreateUserDto): Promise<Users> {
    const hashedPassword = await hashPassword(dto.password);

    const user = await this.userModel.create({
      id: uuidv4(),
      username: dto.username,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
    });

    return user;
  }

  async getProfile(id: number): Promise<Users> {
    const userById = await this.userModel.findByPk(id);

    if (!userById) {
      throw new NotFoundException(`User Not Found`);
    }

    return userById;
  }
}
