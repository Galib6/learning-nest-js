import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: User | undefined;
    try {
      user = await this.userRepository.findOneBy({ email: email });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: "Couldn't fetch user",
      });
    }

    if (!user) {
      throw new UnauthorizedException("User doesn't exists");
    }

    return user;
  }
}
