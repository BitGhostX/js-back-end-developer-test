import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetProductsRequestDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({ isArray: true, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  price: number[];

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page: number;
}

// TODO: Validar en los rangos que el segundo elemento es mayor o igual que el primero
