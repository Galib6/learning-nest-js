import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  public createPost = async (createPost: CreatePostDto) => {
    const existingSlug = await this.postsRepository.findOne({
      where: {
        slug: createPost?.slug,
      },
    });

    if (existingSlug) throw new BadRequestException('Slug invalid');

    let post = this.postsRepository.create(createPost);
    post = await this.postsRepository.save(post);
    return post;
  };

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
