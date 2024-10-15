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

export class CreateUserDtos {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(96)
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
    message:
      'password must contain at least one uppercase letter and one lowercase letter',
  })
  password: string;
}
