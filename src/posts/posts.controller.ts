import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './providers/posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //=====> GET HTTP method
  @Get('/:userId?')
  public async findByUser(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }

  @Post()
  public async createPost(@Body() createPostDto: CreatePostDto) {
    return;
  }
}
