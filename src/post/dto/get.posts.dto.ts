import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class GetPostsDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;

  @IsNotEmpty()
  @IsString()
  orderField: string;

  @IsNotEmpty()
  @IsString()
  orderDirection: string;
}
