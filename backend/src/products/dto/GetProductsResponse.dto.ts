import { ApiProperty } from '@nestjs/swagger';

class MetaData {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  count: number;
}

class Product {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  entryId: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class GetProductsResponseDTO {
  @ApiProperty({
    example: {
      total: 1,
      page: 1,
      count: 2,
    },
  })
  metaData: MetaData;

  @ApiProperty({
    type: Product,
    isArray: true,
    example: [
      {
        _id: '678ef1eb8cff2758bc41ea9f',
        entryId: '4PZ08zGaLVuTSrXhEVUTjP',
        brand: 'Asus',
        category: 'Camera',
        color: 'Gray',
        createdAt: '2024-01-23T21:44:53.805Z',
        currency: 'USD',
        model: 'X-T4',
        name: 'Asus X-T4',
        price: 53.12,
        sku: 'E7OZIKB4',
        stock: 160,
        updatedAt: '2024-01-23T21:44:53.805Z',
      },
    ],
  })
  data: Product[];
}
