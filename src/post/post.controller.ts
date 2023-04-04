import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Body,
  BadRequestException,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { PostService } from './post.service';
import { Post as prismaPost } from '@prisma/client';
import { UpdatePostDto } from './dto/update.post.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  getOnePost(@Param('id', ParseIntPipe) id: number): Promise<prismaPost> {
    return this.postService.getOnePost(id);
  }

  @Get('posts')
  getPosts(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('orderField') orderField: string,
    @Query('orderDirection') orderDirection: string,
  ): Promise<prismaPost[]> {
    return this.postService.getPosts(
      page,
      pageSize,
      orderField,
      orderDirection,
    );
  }

  @Post('post')
  postOnePost(@Body() postData: CreatePostDto): Promise<prismaPost> {
    const { title, content, author, thumbnail } = postData;
    if (!title || !content || !author || !thumbnail) {
      throw new BadRequestException('필수 값이 입력되지 않았습니다.');
    } else {
      const result = this.postService.createPost({
        title,
        content,
        author,
        thumbnail,
      });
      return result;
    }
  }

  @Put('post/:id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ): Promise<prismaPost> {
    return this.postService.updatePost(id, body);
  }

  @Delete('post/:id')
  deleteOnePost(@Param('id', ParseIntPipe) id: number): Promise<prismaPost> {
    return this.postService.deleteOnePost(id);
  }
}
