import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Permission } from 'src/permissions/permission.entity';
import profileConfig from './config/profile.config';
import { AssignPermissionProvider } from './providers/assign-permission.provider';
import { CreateSocialUserProvider } from './providers/create-social-user.provider';
import { CreateUserProvider } from './providers/create-user.provider';

import { FindSocialUserByEmailProvider } from './providers/find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user.provider';
import { UserCreateManyProvider } from './providers/user-create-many.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Permission]),
    ConfigModule.forFeature(profileConfig),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserCreateManyProvider,
    UserCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    AssignPermissionProvider,
    FindSocialUserByEmailProvider,
    CreateSocialUserProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
