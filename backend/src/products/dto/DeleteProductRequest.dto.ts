import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductRequest {
  @ApiProperty({ required: true, example: '4PZ08zGaLVuTSrXhEVUTjP' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
