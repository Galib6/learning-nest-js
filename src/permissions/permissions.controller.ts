import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/paginationQueryDto';
import { CreatePermissionDtos } from './dtos/create-permission.dto';
import { PatchPermissionDto } from './dtos/update-permission.dto';
import { PermissionService } from './providers/permission.service';

@ApiTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: 'This api for get permissions',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 200 response if your permission fetched successfully',
  })
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.permissionService.findAll(paginationQueryDto);
  }

  @ApiOperation({
    summary: 'This api for update permission',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if your permission updated successfully',
  })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDtos) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @ApiOperation({
    summary: 'This api for update permission',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 200 response if your permission updated successfully',
  })
  @Patch()
  update(@Body() patchPermissionDto: PatchPermissionDto) {
    return this.permissionService.updatePermission(patchPermissionDto);
  }

  @ApiOperation({
    summary: 'This api for delete permission',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 200 response if your permission deleted successfully',
  })
  @Delete()
  delete(@Query('id') id: number) {
    return this.permissionService.deletePermission(id);
  }

  //   @ApiOperation({
  //     summary: 'This api for update permission',
  //   })
  //   @ApiResponse({
  //     status: 201,
  //     description:
  //       'You get a 200 response if your permission updated successfully',
  //   })
  //   @Get(':id')
  //   findOne(@Param('id') id: number) {
  //     return this.permissionService.findOne(id);
  //   }
}
