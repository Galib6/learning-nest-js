import { Permission } from 'src/permissions/permission.entity';
import { Post } from 'src/posts/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable()
  permissions: Permission[];
}
