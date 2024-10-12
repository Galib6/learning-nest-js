import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDtos } from './create-user.dtos';

export class PatchUsersDto extends PartialType(
  OmitType(CreateUserDtos, ['password', 'email']),
) {}
