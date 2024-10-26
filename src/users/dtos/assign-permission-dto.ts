import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class AssignPermissionDtos {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Permission Ids',
    type: 'array',
    example: [1, 2],
  })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  permissionIds: number[];
}
