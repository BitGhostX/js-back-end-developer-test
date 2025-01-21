import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNumber,
} from 'class-validator';

export class GetSecondReportDTO {
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  price: number[];

  @Type(() => Date)
  @IsArray()
  @IsDate({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  date: Date[];
}

// TODO: Validar en los rangos que el segundo elemento es mayor o igual que el primero
