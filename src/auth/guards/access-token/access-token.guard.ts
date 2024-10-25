import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * inject JWT configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Extract the request form execution context
    const request = context.switchToHttp().getRequest();
    //extract token for header

    const token = this.extractRequestFormHeader(request);
    //validate the token

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractRequestFormHeader(request: Request): string {
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
