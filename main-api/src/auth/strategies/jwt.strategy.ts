import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../interfaces';
import { UserService } from '@user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const jwtSecret = configService.get('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.findOne(payload.id).catch((err) => {
      this.logger.error(err);
      return null;
    });
    if (!user) {
      throw new UnauthorizedException('Не удалось найти пользователя');
    }

    // Возвращаем объект, который будет доступен в req.user
    return {
      id: user.id,
      name: user.name,
      roles: payload.roles, // Используем roles из JWT, а не из БД (если они там есть)
    };
  }
}
