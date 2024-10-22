import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination';

@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
