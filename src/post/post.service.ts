import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from './entity/post.entity';
import { CreatePostDto } from './dto/create.post.dto';

@Injectable()
export class PostService {
  private Posts: Posts[] = [];

  getOnePost(id: number): Posts {
    const post = this.Posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }
    return post;
  }

  createPost(body: CreatePostDto): Posts {
    console.log(body);
  }
}
