import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dtos';

export class CreateManyUserDto {
  @ApiProperty({
    type: CreateUserDto,
    required: true,
    description: 'Array of user objects',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
