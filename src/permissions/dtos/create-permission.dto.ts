import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePermissionDtos {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  user?: number[];
}
