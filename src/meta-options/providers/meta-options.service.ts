import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from '../dtos/create-meta-options.dto';
import { MetaOption } from '../meta-options.entity';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**Meta Option Repository */
    @InjectRepository(MetaOption)
    private readonly metaPostRepository: Repository<MetaOption>,
  ) {}

  public async create(createMetaOptionsDto: CreateMetaOptionsDto) {
    let metaOption = this.metaPostRepository.create(createMetaOptionsDto);
    metaOption = await this.metaPostRepository.save(metaOption);
    return metaOption;
  }
}
