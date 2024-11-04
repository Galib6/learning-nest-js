import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { IActiveUser } from '../interfaces/active-user.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    //JWT configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    //generate token provider
    private readonly generateTokenProvider: GenerateTokensProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      //verify the refresh token
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(refreshTokenDto.refreshToken, this.jwtConfiguration);

      const user = this.userService.findOneById(sub);

      // generate new tokens

      return await this.generateTokenProvider.generateToken(user);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
