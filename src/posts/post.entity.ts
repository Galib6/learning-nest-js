import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateMetaPostDto } from './dtos/create-post-meta-options.dto';
import { PostStatus } from './enum/postStatus.enum';
import { PostType } from './enum/postType.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 250,
  })
  title: string;

  @Column({
    type: 'varchar',
    enum: PostType,
    nullable: false,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    enum: PostStatus,
    nullable: false,
  })
  status: PostStatus;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedOn: Date;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metaOptions?: CreateMetaPostDto[];
}
