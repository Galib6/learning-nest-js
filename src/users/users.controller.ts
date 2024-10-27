import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/access-token.decorator';
import { AuthType } from 'src/auth/enums/enum';
import { Permission } from 'src/permissions/decorators/permission.decorator';
import { AssignPermissionDtos } from './dtos/assign-permission-dto';
import { CreateManyUserDto } from './dtos/create-many-users.dto';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './providers/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The list of all users',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'The page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description:
      'The position of the page number that you want to the API to return',
  })
  getUsers() {
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Param() getUserParamDtos: GetUserParamsDtos,
    return this.userService.findAll();
  }

  @Post()
  @Auth(AuthType.None)
  @Permission('string')
  createUser(
    @Body() createUsersDto: CreateUserDto,
    // @Headers() headers: any,
    // @Ip() ipAddress: any,
  ): any {
    return this.userService.createUser(createUsersDto);
  }

  @Post('create-many')
  createManyUser(
    @Body() createManyUsersDto: CreateManyUserDto,
    // @Headers() headers: any,
    // @Ip() ipAddress: any,
  ): any {
    return this.userService.createMany(createManyUsersDto);
  }

  @Patch()
  updateUser() // @Body() _patchUserDtos: PatchUsersDto
  : string {
    return `Send request to update a user`;
  }

  @Delete()
  deleteUser(): string {
    return `Send request to delete a user`;
  }

  @ApiOperation({ summary: 'Assign permission to user' })
  @Post('assign-permission')
  assignPermission(@Body() assignPermissionDtos: AssignPermissionDtos) {
    return this.userService.assignPermission(assignPermissionDtos);
  }
}
