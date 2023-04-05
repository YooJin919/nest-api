import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as prismaPost } from '@prisma/client';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { GetPostsDto } from './dto/get.posts.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  getOnePost(@Param('id') id: number): Promise<prismaPost> {
    return this.postService.getOnePost(id);
  }

  @Get('posts')
  getPosts(@Query() getPostsDto: GetPostsDto): Promise<prismaPost[]> {
    return this.postService.getPosts(getPostsDto);
  }

  @Post('post')
  postOnePost(@Body() postData: CreatePostDto): Promise<prismaPost> {
    const result = this.postService.createPost(postData);
    return result;
  }

  @Put('post/:id')
  updatePost(
    @Param('id') id: number,
    @Body() body: UpdatePostDto,
  ): Promise<prismaPost> {
    return this.postService.updatePost(id, body);
  }

  @Delete('post/:id')
  deleteOnePost(@Param('id') id: number): Promise<prismaPost> {
    return this.postService.deleteOnePost(id);
  }
}
