import { Injectable } from '@nestjs/common';
import { CreateSocialUserDto } from 'src/users/dtos/create-social-users.dtos.';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { GoogleSignInProvider } from './google-sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,

    private readonly refreshTokenProvider: RefreshTokensProvider,

    private readonly googleSignInProvider: GoogleSignInProvider,
  ) {}

  public signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }
  public refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }
  public googleSignIn(googleSignInDto: CreateSocialUserDto) {
    return this.googleSignInProvider.googleSignIn(googleSignInDto);
  }
}
