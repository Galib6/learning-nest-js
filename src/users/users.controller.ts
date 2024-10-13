import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDtos } from './dtos/create-user.dtos';
import { GetUserParamsDtos } from './dtos/get-users-params.dto';
import { PatchUsersDto } from './dtos/patch-users.dto';
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
  getUsers(
    @Param() getUserParamDtos: GetUserParamsDtos,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.userService.findAll(getUserParamDtos, page, limit);
  }

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDtos,
    // @Headers() headers: any,
    // @Ip() ipAddress: any,
  ): string {
    console.log(createUserDto);
    return `Send request to create a user`;
  }

  @Patch()
  updateUser(@Body() patchUserDtos: PatchUsersDto): string {
    console.log(patchUserDtos);
    return `Send request to update a user`;
  }

  @Delete()
  deleteUser(): string {
    return `Send request to delete a user`;
  }
}
