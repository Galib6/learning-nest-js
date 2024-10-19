import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    minLength: 3,
    maxLength: 96,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    minLength: 3,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @ApiProperty({
    description: 'The email of the user',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @MaxLength(96)
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
    message:
      'password must contain at least one uppercase letter and one lowercase letter',
  })
  password: string;
}
