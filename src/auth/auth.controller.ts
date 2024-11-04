import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from './decorators/access-token.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthType } from './enums/enum';
import { GoogleUser } from './interfaces/google-user.interface';
import { AuthService } from './providers/auth.service';

@ApiTags('Auth')
@Controller('auth')
@Auth(AuthType.None)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Query('callbackUrl') callbackUrl: string, req: Request) {
    req.session.callbackUrl = callbackUrl;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request & { user: GoogleUser }) {
    const user = req?.user;
    delete user.picture;

    return this.authService.googleSignIn(req.user);
  }
}
