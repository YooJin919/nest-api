import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';

@Controller('post')
export class PostController {
  @Get(':id')
  getOnePost(@Param('id') id: number): string {
    return `getOnePost ${id}`;
  }

  @Delete(':id')
  deleteOnePost(@Param('id') id: number): string {
    return `deleteOnePost ${id}`;
  }

  @Post()
  postOnePost(@Body() postData: CreatePostDto): string {
    const { title, content, author, thumbnail } = postData;
    if (!title || !content || !author || !thumbnail) {
      throw new BadRequestException('필수 값이 입력되지 않았습니다.');
    } else {
      return `postOnePost`;
    }
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() body): string {
    const { title, author, content, thumbnail } = body;
    console.log(id, title, author, content, thumbnail);
    return `updatePost ${id}, ${title}`;
  }
}
