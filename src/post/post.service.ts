import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Post as prismaPost } from '@prisma/client';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getOnePost(id: number): Promise<prismaPost> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async createPost(createData: CreatePostDto): Promise<prismaPost> {
    return this.prisma.post.create({ data: createData });
  }

  async getPosts(
    page,
    pageSize,
    orderField,
    orderDirection,
  ): Promise<prismaPost[]> {
    return this.prisma.post.findMany({
      take: pageSize,
      skip: pageSize * (page - 1),
      orderBy: { [orderField]: orderDirection },
    });
  }

  async updatePost(id: number, body: UpdatePostDto): Promise<prismaPost> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deleteOnePost(id: number): Promise<prismaPost> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
