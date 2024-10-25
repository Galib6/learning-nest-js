import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user.provider';
import { UserCreateManyProvider } from './user-create-many.provider';

@Injectable()
export class UsersService {
  constructor(
    // circular dependency
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // injecting config service
    private readonly configService: ConfigService,

    // injecting config service
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    //inject data source
    private readonly dataSource: DataSource,

    //inject create many provider
    private readonly userCreateManyProvider: UserCreateManyProvider,

    //inject create user provider
    private readonly createUserProvider: CreateUserProvider,

    //find one user by email provider
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public findAll() {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: "API DOESN'T EXISTS",
        fileName: 'User.service.ts',
        lineNumber: 69,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occurred because the api end point moved',
      },
    );
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
}
