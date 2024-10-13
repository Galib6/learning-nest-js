import { Injectable } from '@nestjs/common';
import { GetUserParamsDtos } from '../dtos/get-users-params.dto';

@Injectable()
export class UsersService {
  //=====> findAll method
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
