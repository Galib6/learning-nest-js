import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/paginationQueryDto';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    /**
     * create the request urls
     */
    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';

    const newUrl = new URL(this.request.url, baseUrl);

    /**
     * Calculating page number
     */
    const totalItems = await repository.count();
    const totalPage = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery?.page === totalPage
        ? paginationQuery?.page
        : paginationQuery?.page + 1;

    const prevPage =
      paginationQuery?.page === 1
        ? paginationQuery?.page
        : paginationQuery?.page - 1;

    const finalResponse: Paginated<T> = {
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPage,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery?.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery?.limit}&page=${totalPage}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery?.limit}&page=${paginationQuery?.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery?.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery?.limit}&page=${prevPage}`,
      },
      data: results,
    };

    return finalResponse;
  }
}
