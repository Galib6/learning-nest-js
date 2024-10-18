import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, MetaOption])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
