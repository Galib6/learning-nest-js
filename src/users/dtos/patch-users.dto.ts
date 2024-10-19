import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dtos';

export class PatchUsersDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email']),
) {}
