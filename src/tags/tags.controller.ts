import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagsDto } from './dtos/create-tags.dto';
import { TagsService } from './providers/tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({
    status: 200,
  })
  public async find() {
    // return this.tagsService.createTag(createTagsDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create tags' })
  @ApiResponse({
    status: 200,
  })
  public async createTag(@Body() createTagsDto: CreateTagsDto) {
    return this.tagsService.createTag(createTagsDto);
  }

  @Delete()
  @ApiOperation({ summary: 'delete tags' })
  @ApiResponse({
    status: 200,
  })
  public async deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  @Delete('soft-delete')
  @ApiOperation({ summary: 'delete tags' })
  @ApiResponse({
    status: 200,
  })
  public async softDeleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
