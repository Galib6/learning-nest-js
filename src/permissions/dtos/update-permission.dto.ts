import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePermissionDtos } from './create-permission.dto';

// export class postUpdateDto extends PartialType(OmitType(CreatePostDto, [])) {}
export class PatchPermissionDto extends PartialType(CreatePermissionDtos) {
  @ApiProperty({
    description: 'Id and post that needs to be updated',
    example: 0,
    type: 'number',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
