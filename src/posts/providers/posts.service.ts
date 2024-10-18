import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    /**Injecting User service */
    private readonly usersService: UsersService,

    /**Injecting post repository service */
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    /**Injecting metaOption repository */
    // @InjectRepository(MetaOption)
    // private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public createPost = async (createPostDto: CreatePostDto) => {
    // find author
    const author = await this.usersService.findOneById(createPostDto.authorId);
    /** creating post */
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
    });
    post = await this.postsRepository.save(post);
    return post;
  };

  public async findAll(id: number) {
    // const user = this.usersService.findOneById(id);
    const posts = await this.postsRepository.find({
      relations: {
        // metaOptions: true,
        author: true,
      },
    });
    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
