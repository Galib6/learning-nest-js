import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum PostType {
  POST = 'blog',
  PAGE = 'page',
  STORY = 'story',
  SERIES = 'series',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

class MetaOption {
  @ApiProperty()
  @IsString()
  key: string;
}

export class CreatePostDto {
  title: string;

  postType: PostType;

  slug: string;

  status: PostStatus;

  content?: string;

  schema?: string;

  featuredImageUrl?: string;

  publishedOn: Date;

  tags: string[];

  metaOptions: MetaOption[];
}
