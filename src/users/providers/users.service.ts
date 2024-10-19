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
import { AuthService } from 'src/auth/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { User } from '../user.entity';
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
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let userExist;
    try {
      userExist = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
    return newUser;
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
}
