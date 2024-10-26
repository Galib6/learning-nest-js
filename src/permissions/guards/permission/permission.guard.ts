import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const userId = request[REQUEST_USER_KEY]?.sub;

    let userWithPermission: User;

    try {
      userWithPermission = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.permissions', 'permission')
        .where('user.id = :userId', { userId })
        .andWhere('permission.name = :name', { name: requiredPermission })
        .getOne();
    } catch {
      throw new RequestTimeoutException('Unable to process', {
        description: 'Please try again later',
      });
    }

    if (!userWithPermission?.id) {
      throw new ForbiddenException(
        'User does not have the required permission to access this api',
      );
    }

    return;
  }
}
