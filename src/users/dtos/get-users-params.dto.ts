import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class GetUserParamsDtos {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
