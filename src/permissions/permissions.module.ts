import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { Permission } from './permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionService } from './providers/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), PaginationModule],
  controllers: [PermissionsController],
  providers: [PermissionService],
})
export class PermissionsModule {}
