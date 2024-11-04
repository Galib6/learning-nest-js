import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    /**Injecting User service */
    private readonly usersService: UsersService,

    /** Injecting Tag service */
    private readonly tagsService: TagsService,

    /**Injecting post repository service */
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  public create = async (createPostDto: CreatePostDto, user: IActiveUser) => {
    let author = undefined;
    let tags = undefined;

    try {
      // find author
      author = await this.usersService.findOneById(user?.sub);
      //find tags
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (err) {
      throw new ConflictException(err);
    }

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your tag ids');
    }

    /** creating post */
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });
    try {
      post = await this.postsRepository.save(post);
    } catch (err) {
      throw new ConflictException(err);
    }
    return post;
  };
}
