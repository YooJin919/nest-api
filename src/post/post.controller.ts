import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Body,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { PostService } from './post.service';
import { Posts } from './entity/post.entity';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  getOnePost(@Param('id') id: number): Posts {
    return this.postService.getOnePost(id);
  }

  @Get('posts')
  getPosts(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('orderField') orderField: string,
    @Query('orderDirection') orderDirection: string,
  ): string {
    return `getPosts ${page} ${pageSize} ${orderField} ${orderDirection}`;
  }

  @Post('post')
  postOnePost(@Body() postData: CreatePostDto): Posts {
    const { title, content, author, thumbnail } = postData;
    if (!title || !content || !author || !thumbnail) {
      throw new BadRequestException('필수 값이 입력되지 않았습니다.');
    } else {
      return this.postService.createPost(postData);
    }
  }

  @Put('post/:id')
  updatePost(@Param('id') id: number, @Body() body): string {
    const { title, author, content, thumbnail } = body;
    console.log(id, title, author, content, thumbnail);
    return `updatePost ${id}, ${title}`;
  }

  @Delete('post/:id')
  deleteOnePost(@Param('id') id: number): string {
    return `deleteOnePost ${id}`;
  }
}
