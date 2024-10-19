import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionsDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
