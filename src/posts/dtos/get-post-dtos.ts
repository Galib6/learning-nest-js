import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/paginationQueryDto';

class GetPostBaseDto {
  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;
}

export class GetPostDto extends IntersectionType(
  GetPostBaseDto,
  PaginationQueryDto,
) {}