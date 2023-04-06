import { Post } from '@prisma/client';

export class Posts implements Post {
  id: number;
  title: string;
  author: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
}
