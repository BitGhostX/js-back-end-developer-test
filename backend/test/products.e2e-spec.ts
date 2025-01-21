import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/products/products.service';
import { INestApplication } from '@nestjs/common';
import { ProductsController } from 'src/products/products.controller';

describe('Products', () => {
  let app: INestApplication;
  const mockProductsService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteById: jest.fn((id: string) => ({
      acknowledged: true,
      deletedCount: 1,
    })),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/DELETE`, () => {
    const id = 'ABC';
    return request(app.getHttpServer())
      .delete(`/products/${id}`)
      .expect(200)
      .expect(mockProductsService.deleteById(id));
  });

  afterAll(async () => {
    await app.close();
  });
});
