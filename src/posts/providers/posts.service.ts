import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { GetPostDto } from '../dtos/get-post-dtos';
import { PatchPostDto } from '../dtos/update-post.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    /**Injecting User service */
    private readonly usersService: UsersService,

    /** Injecting Tag service */
    private readonly tagsService: TagsService,

    /**Injecting post repository service */
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    /**Injecting metaOption repository */
    // @InjectRepository(MetaOption)
    // private metaOptionsRepository: Repository<MetaOption>,

    /**Injecting tags repository */
    // @InjectRepository(Tag)
    // private tagsRepository: Repository<Tag>,

    //pagination provider
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public createPost = async (createPostDto: CreatePostDto) => {
    // find author
    const author = await this.usersService.findOneById(createPostDto.authorId);

    //find tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    /** creating post */
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });
    post = await this.postsRepository.save(post);
    return post;
  };

  public async findAll(
    postQuery: GetPostDto,
    userId: number,
  ): Promise<Paginated<Post>> {
    const result = await this.paginationProvider.paginationQuery<Post>(
      { limit: postQuery?.limit, page: postQuery?.page },
      this.postsRepository,
    );

    return result;
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags;
    let post;
    try {
      // find Tags
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
      //find the post
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }

    if (!tags.length) throw new BadRequestException('Tags not exists');
    if (!post) throw new BadRequestException('Post not exists');

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;
    post.slug = patchPostDto.slug ?? post.slug;

    //assign th new tags
    post.tags = tags;
    //save the post
    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
