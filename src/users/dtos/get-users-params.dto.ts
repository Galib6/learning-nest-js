import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class GetUserParamsDtos {
  @ApiPropertyOptional({
    description: 'The id of the user',
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
