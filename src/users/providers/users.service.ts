import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth/providers/auth.service';
import { GetUserParamsDtos } from '../dtos/get-users-params.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  //=====> findAll method
  public findAll(
    getUserParamDtos: GetUserParamsDtos,
    page: number,
    limit: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        email: 'mockuser@example.com',
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        email: 'mockuser@exame.com',
        firstName: 'John',
        lastName: 'Doe',
      },
    ];
  }

  //=====> findOne method
  public findOneById(id: number) {
    return {
      id: 1,
      email: '',
      firstName: 'John',
      lastName: 'Doe',
    };
  }
}
