import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MetaOption } from './meta-options/meta-options.entity';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { Post } from './posts/post.entity';
import { PostsModule } from './posts/posts.module';
import { Tag } from './tags/tag.entity';
import { TagsModule } from './tags/tags.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [User, Post, Tag, MetaOption],
        synchronize: true,
        port: 5432,
        username: 'galib',
        password: '123456',
        host: '174.138.21.33',
        database: 'nestjs-blog',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
