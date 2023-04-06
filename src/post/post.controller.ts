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
import { Posts } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post/:id')
  getPost(@Param('id') id: number): Promise<Posts | null> {
    return this.postService.getPost(id);
  }

  @Get('posts')
  getPosts(@Query() getPostsDto: GetPostsDto): Promise<Posts[] | null> {
    return this.postService.getPosts(getPostsDto);
  }

  @Post('post')
  createPost(@Body() postData: CreatePostDto): Promise<Posts> {
    const result = this.postService.createPost(postData);
    return result;
  }

  @Put('post/:id')
  updatePost(
    @Param('id') id: number,
    @Body() body: UpdatePostDto,
  ): Promise<Posts> {
    return this.postService.updatePost(id, body);
  }

  @Delete('post/:id')
  deletePost(@Param('id') id: number): Promise<Posts> {
    return this.postService.deletePost(id);
  }
}
