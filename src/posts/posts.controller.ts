import { Controller, Get, Query } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  getPosts(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('orderField') orderField: string,
    @Query('orderDirection') orderDirection: string,
  ): string {
    return `getPosts ${page} ${pageSize} ${orderField} ${orderDirection}`;
  }
}
