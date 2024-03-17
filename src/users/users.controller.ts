import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { CurrentUserDescriptor } from './decorators';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @UseGuards(JwtGuard)
  @Get('get-profile')
  async getUser(@CurrentUserDescriptor() user: { userId: number }) {
    return await this.usersService.getProfile(user.userId);
  }
}
