import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Posts } from './entity/post.entity';
import { UpdatePostDto } from './dto/update.post.dto';
import { GetPostsDto } from './dto/get.posts.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getOnePost(id: number): Promise<Posts> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async createPost(createData: CreatePostDto): Promise<Posts> {
    return this.prisma.post.create({ data: createData });
  }

  async getPosts(getPostsDto: GetPostsDto): Promise<Posts[]> {
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

  async deleteOnePost(id: number): Promise<Posts> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
