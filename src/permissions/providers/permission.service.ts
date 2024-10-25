import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dtos/paginationQueryDto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination';
import { Repository } from 'typeorm';
import { CreatePermissionDtos } from '../dtos/create-permission.dto';
import { PatchPermissionDto } from '../dtos/update-permission.dto';
import { Permission } from '../permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    /** Inject repository */
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    /** pagination provider */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  // Create a new permission
  async createPermission(
    createPermissionDto: CreatePermissionDtos,
  ): Promise<Permission> {
    const { name, description } = createPermissionDto;
    const permission = this.permissionRepository.create({
      name,
      description,
    });

    return this.permissionRepository.save(permission);
  }

  // Update an existing permission
  async updatePermission(
    updatePermissionDto: PatchPermissionDto,
  ): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id: updatePermissionDto.id },
    });
    if (!permission) {
      throw new NotFoundException(`Permission not found`);
    }

    Object.assign(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  // Delete a permission
  async deletePermission(id: number): Promise<void> {
    const result = await this.permissionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }

  // Optional: Fetch a list of all permissions
  async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<Paginated<Permission>> {
    return this.paginationProvider.paginationQuery(
      paginationQueryDto,
      this.permissionRepository,
    );
  }

  // Optional: Find a specific permission by ID
  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }
}
