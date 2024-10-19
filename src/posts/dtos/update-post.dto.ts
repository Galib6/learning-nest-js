import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

// export class postUpdateDto extends PartialType(OmitType(CreatePostDto, [])) {}
export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Id and post that needs to be updated',
    example: 0,
    type: 'number',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
