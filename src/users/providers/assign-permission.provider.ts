import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/permission.entity';
import { In, Repository } from 'typeorm';
import { AssignPermissionDtos } from '../dtos/assign-permission-dto';
import { User } from '../user.entity';

@Injectable()
export class AssignPermissionProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  public async assign(assignPermissionDtos: AssignPermissionDtos) {
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(assignPermissionDtos?.permissionIds),
      },
    });

    let user = await this.userRepository.findOne({
      where: {
        id: assignPermissionDtos.id,
      },
    });

    if (!permissions.length || !user) {
      throw new NotFoundException('User or permission with id not found');
    }

    user = await this.userRepository.save(
      Object.assign(user, { permissions: permissions }),
    );
    delete user.password;

    return user;
  }
}
