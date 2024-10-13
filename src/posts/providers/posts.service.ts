import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  public findAll(id: number) {
    const user = this.usersService.findOneById(id);
    return [
      {
        user: user,
        title: 'Post 1',
        content: 'This is a post',
      },
      {
        user: user,
        title: 'Post 2',
        content: 'This is another post',
      },
    ];
  }
}
