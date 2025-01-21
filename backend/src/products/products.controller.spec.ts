import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  const mockProductsService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteById: jest.fn((id: string) =>
      Promise.resolve({
        acknowledged: true,
        deletedCount: 1,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delete product by id', () => {
    const id = 'ABC';
    expect(controller.delete({ id })).toEqual(
      mockProductsService.deleteById(id),
    );
  });
});
