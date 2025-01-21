import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SysDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}

class FieldsDTO {
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @Min(0)
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @Min(0)
  @IsPositive()
  @Type(() => Number)
  stock: number;
}

export class CreateProductDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => SysDTO)
  sys: SysDTO;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FieldsDTO)
  fields: FieldsDTO;
}
