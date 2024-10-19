import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import profileConfig from './config/profile.config';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

import { UserCreateManyProvider } from './providers/user-create-many.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserCreateManyProvider, UserCreateManyProvider],
  exports: [UsersService],
})
export class UsersModule {}
