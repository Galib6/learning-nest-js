import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MetaOption } from 'src/meta-options/meta-options.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/user.entity';
import { PostStatus } from './enum/postStatus.enum';
import { PostType } from './enum/postType.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 512,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
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
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1024,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn: Date;

  @OneToOne(
    /**annotation of creating relation */
    () => MetaOption,
    /**Defining the property */
    (metaOptions) => metaOptions.post,
    /**cascade and populate , for populate user eger: true */
    {
      cascade: true,
      eager: true,
    },
  )
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];
}
