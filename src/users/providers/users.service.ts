import { Injectable } from '@nestjs/common';
import { GetUserParamsDtos } from '../dtos/get-users-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUserParamDtos: GetUserParamsDtos,
    page: number,
    limit: number,
  ) {
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
}
