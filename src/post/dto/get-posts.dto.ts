import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { OrderField } from '../../enums/order-field.enum';
import { OrderDirection } from '../../enums/order-direction.enum';

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
  @IsEnum(OrderField)
  @Transform(({ value }) =>
    value.toUpperCase() in OrderField ? value : OrderField.TITLE,
  )
  orderField: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderDirection)
  @Transform(({ value }) =>
    value.toUpperCase() in OrderDirection ? value : OrderDirection.ASC,
  )
  orderDirection: string;
}
