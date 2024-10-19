import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagsDto } from '../dtos/create-tags.dto';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDto: CreateTagsDto) {
    let tags = this.tagsRepository.create(createTagDto);
    tags = await this.tagsRepository.save(tags);
    return tags;
  }

  public async findMultipleTags(tags: number[]) {
    const result = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });

    return result;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { deleted: true, id };
  }

  public async softRemove(id: number) {
    await this.tagsRepository.softDelete(id);
    return { softDeleted: true, id };
  }
}
