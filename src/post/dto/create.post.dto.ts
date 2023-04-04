import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;
}
