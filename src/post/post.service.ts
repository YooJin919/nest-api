import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Posts } from './entity/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPost(id: number): Promise<Posts | null> {
    const result = this.prisma.post.findUnique({
      where: { id },
    });
    return result;
  }

  async createPost(createData: CreatePostDto): Promise<Posts> {
    return this.prisma.post.create({ data: createData });
  }

  async getPosts(getPostsDto: GetPostsDto): Promise<Posts[] | null> {
    return this.prisma.post.findMany({
      take: getPostsDto.pageSize,
      skip: getPostsDto.pageSize * (getPostsDto.page - 1),
      orderBy: { [getPostsDto.orderField]: getPostsDto.orderDirection },
    });
  }

  async updatePost(id: number, body: UpdatePostDto): Promise<Posts> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deletePost(id: number): Promise<Posts> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
