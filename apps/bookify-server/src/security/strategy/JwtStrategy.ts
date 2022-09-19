import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@bookify/data';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static JWT_KEY = 'JWT_SECRET';

  constructor(
    private readonly userService: UserService,
    // service that is used for
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(JwtStrategy.JWT_KEY),
    });
  }

  /**
   * https://docs.nestjs.com/security/authentication#implementing-passport-jwt
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  async validate(payload: JwtPayload, done: Function) {
    const user = await this.userService.findUserOrNullByEmail(payload.email);

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
