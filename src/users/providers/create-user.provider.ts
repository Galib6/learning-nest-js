import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { User } from '../user.entity';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // let userExist;
    // try {
    //   userExist = await this.usersRepository.findOne({
    //     where: { email: createUserDto.email },
    //   });
    // } catch {
    //   throw new RequestTimeoutException('Unable to process request', {
    //     description: 'Error connecting to the database',
    //   });
    // }

    // if (userExist) {
    //   throw new BadRequestException('User already exists');
    // }

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
    return newUser;
  }
}
