import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //=====> GET HTTP method
  @Get('/:userId?')
  public async findByUser(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }
}
