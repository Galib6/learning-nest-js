import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(public metaOptionService: MetaOptionsService) {}

  @Post()
  public create(@Body() createMetaOptionDto: CreateMetaOptionsDto) {
    return this.metaOptionService.create(createMetaOptionDto);
  }
}
