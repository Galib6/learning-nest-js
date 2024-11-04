import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignPermissionDtos } from '../dtos/assign-permission-dto';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { CreateSocialUserDto } from '../dtos/create-social-users.dtos.';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { User } from '../user.entity';
import { AssignPermissionProvider } from './assign-permission.provider';
import { CreateSocialUserProvider } from './create-social-user.provider';
import { CreateUserProvider } from './create-user.provider';

import { FindSocialUserByEmailProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user.provider';
import { UserCreateManyProvider } from './user-create-many.provider';

@Injectable()
export class UsersService {
  constructor(
    // // circular dependency
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // // injecting config service
    // private readonly configService: ConfigService,

    // // injecting config service
    // @Inject(profileConfig.KEY)
    // private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // //inject data source
    // private readonly dataSource: DataSource,

    //inject create many provider
    private readonly userCreateManyProvider: UserCreateManyProvider,

    //inject create user provider
    private readonly createUserProvider: CreateUserProvider,

    //find one user by email provider
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    //Assign role provider
    private readonly assignPermissionProvider: AssignPermissionProvider,

    //find one by google id provider inject
    private readonly findSocialUserByEmailProvider: FindSocialUserByEmailProvider,

    //find one by google id provider inject
    private readonly createSocialUserProvider: CreateSocialUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public findAll() {
    return [
      {
        email: 'mockuser@example.com',
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        email: 'mockuser@exame.com',
        firstName: 'John',
        lastName: 'Doe',
      },
    ];
  }

  public findOneById(id: number) {
    let user;

    try {
      user = this.usersRepository.findOneBy({ id: id });
    } catch {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
    if (!user) {
      throw new BadRequestException("User doesn't exists");
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUserDto) {
    return this.userCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async assignPermission(assignPermissionDtos: AssignPermissionDtos) {
    return this.assignPermissionProvider.assign(assignPermissionDtos);
  }

  public async findSocialUserByEmail(email: string) {
    return this.findSocialUserByEmailProvider.findOneBySocialUserByEmail(email);
  }

  public async createSocialUser(createSocialUserDto: CreateSocialUserDto) {
    return this.createSocialUserProvider.createGoogleUser(createSocialUserDto);
  }
}
