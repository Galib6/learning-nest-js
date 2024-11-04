import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { CreateMetaOptionsDto } from 'src/meta-options/dtos/create-meta-options.dto';
import { PostStatus } from '../enum/postStatus.enum';
import { PostType } from '../enum/postType.enum';

export class CreatePostDto {
  @ApiProperty({
    title: 'Title of the post',
    description: 'Title of the post',
    example: 'My first post',
    type: 'string',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    title: 'Type of the post',
    description: 'Type of the post',
    enum: PostType,
    type: 'string',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

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

  @ApiProperty({
    title: 'Post Status',
    description: 'Possible values are draft, published, reviewed, published',
    enum: PostStatus,
    type: 'string',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    title: 'Post Content',
    description: 'Post Content in HTML format',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialized your JSON object else a validation error will be thrown',
    example: '{"message":"schema must be a json string"}',
    type: 'string',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured Image URL',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Published on date',
    example: '2021-01-01T00:00:00.000Z',
  })
  @ApiProperty()
  // @IsISO8601()
  @IsOptional()
  publishedOn: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string values',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags: number[];

  @ApiPropertyOptional({
    description: 'Array of meta options',
    type: CreateMetaOptionsDto,
    // properties: {
    //   metaValue: {
    //     type: 'json',
    //     description:
    //       'The string can be any string identifier for your meta option',
    //     example: "{'/sidebarEnabled'/ : true}",
    //   },
    // },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions?: CreateMetaOptionsDto | null;
}
