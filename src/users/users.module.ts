import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.entity';
import { JwtGuard } from '../guards/jwt.guard';

@Module({
  imports: [JwtModule.register({}), SequelizeModule.forFeature([Users])],
  providers: [UsersService, JwtGuard],
  controllers: [UsersController],
})
export class UsersModule {}
