import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagsDto {
  @ApiProperty({
    title: 'name of the tag',
    example: 'science',
    type: 'string',
  })
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    title: 'Slug of the post',
    description: 'Slug of post',
    example: 'my-first-post',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug can only contain lowercase alphanumeric characters and hyphens.',
  })
  slug: string;

  @ApiPropertyOptional({
    title: 'description of the post',
    description: 'description of post',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'string',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
