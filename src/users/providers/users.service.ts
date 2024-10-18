import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDtos } from '../dtos/create-user.dtos';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    // circular dependency
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDtos) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    let newUser = this.usersRepository.create(createUserDto);

    newUser = await this.usersRepository.save(newUser);
    return newUser;
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
    return this.usersRepository.findOneBy({ id: id });
  }
}
