import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../users/users.entity';

@Module({
  imports: [JwtModule.register({}), SequelizeModule.forFeature([Users])],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
