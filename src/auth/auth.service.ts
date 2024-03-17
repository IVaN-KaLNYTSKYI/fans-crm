import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDto, LoginRequestDto } from './dto';
import { AppConfig } from '../common';
import { comparePassword } from '../common/app-helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginRequestDto): Promise<AuthTokenDto> {
    const user = await this.userModel.findOne<Users>({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User email does not exist');
    }

    const isPassword = await comparePassword(dto.password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('password or email is incorrect');
    }

    const accessToken = await this.jwtService.sign(
      {
        userId: `${user.id}`,
      },
      {
        expiresIn: AppConfig.jwt.accessTokenExpiration,
        secret: AppConfig.jwt.accessTokenSecret,
      },
    );

    const refreshToken = await this.jwtService.sign(
      {
        userId: `${user.id}`,
      },
      {
        expiresIn: AppConfig.jwt.refreshTokenExpiration,
        secret: AppConfig.jwt.refreshTokenSecret,
      },
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
