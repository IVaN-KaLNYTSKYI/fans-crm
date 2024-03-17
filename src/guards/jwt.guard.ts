import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const { user_id, payload } = this.jwtService.verify(token, {
        secret: AppConfig.jwt.accessTokenSecret,
      });

      request.user = { user_id: user_id, profile_id: payload.profile_id };

      const userExistsById = await this.userRepository.findOne({
        where: { id: user_id },
      });

      if (userExistsById) {
        userExistsById.last_activity = new Date();
        await this.userRepository.save(userExistsById);
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
