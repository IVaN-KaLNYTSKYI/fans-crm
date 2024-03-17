import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '../common';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const { userId } = this.jwtService.verify(token, {
        secret: AppConfig.jwt.accessTokenSecret,
      });

      request.user = { userId };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
