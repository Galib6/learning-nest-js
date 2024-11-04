import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSocialUserDto } from '../dtos/create-social-users.dtos.';
import { User } from '../user.entity';

@Injectable()
export class CreateSocialUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createGoogleUser(
    createSocialUserDto: CreateSocialUserDto,
  ): Promise<User> {
    let user = this.userRepository.create(createSocialUserDto);
    user = await this.userRepository.save(user);
    return user;
  }
}
