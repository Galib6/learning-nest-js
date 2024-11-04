import { forwardRef, Inject } from '@nestjs/common';
import { CreateSocialUserDto } from 'src/users/dtos/create-social-users.dtos.';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';

export class GoogleSignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}
  public async googleSignIn(userInfo: CreateSocialUserDto) {
    try {
      let user = await this.usersService.findSocialUserByEmail(userInfo.email);
      if (!user) {
        user = await this.usersService.createSocialUser(userInfo);
      }

      const generatedToken = this.generateTokenProvider.generateToken(user);
      return generatedToken;
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      throw error;
    }
  }
}
