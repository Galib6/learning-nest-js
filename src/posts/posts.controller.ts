import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostDto } from './dtos/get-post-dtos';
import { PatchPostDto } from './dtos/update-post.dto';
import { PostsService } from './providers/posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //=====> GET HTTP method ================>
  @Get('/:userId?')
  public async findByUser(
    @Param('userId') userId: number,
    @Query() getPostDto: GetPostDto,
  ) {
    return this.postsService.findAll(getPostDto, userId);
  }

  //=====> POST HTTP method ================>

  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  public async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  //=====> PATCH HTTP method ================>
  @ApiOperation({
    summary: 'This api update post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is updated successfully',
  })
  @Patch()
  public async updatePost(@Body() patchPostDTO: PatchPostDto) {
    return this.postsService.update(patchPostDTO);
  }

  //=====> PATCH HTTP method ================>
  @ApiOperation({
    summary: 'This api update post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is updated successfully',
  })
  @Delete()
  public async deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
