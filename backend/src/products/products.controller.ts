import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsRequestDTO } from './dto/GetProductsRequest.dto';
import { GetProductsResponseDTO } from './dto/GetProductsResponse.dto';
import { DeleteProductRequest } from './dto/DeleteProductRequest.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiOkResponse({ type: GetProductsResponseDTO })
  async get(
    @Query()
    query: GetProductsRequestDTO,
  ): Promise<GetProductsResponseDTO> {
    const response = await this.productsService.get(query);

    return response;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by entry id' })
  async delete(@Param() { id }: DeleteProductRequest) {
    const response = await this.productsService.deleteById(id);

    return response;
  }
}
