import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { GetProductsRequestDTO } from './dto/GetProductsRequest.dto';
import { ConfigService } from '@nestjs/config';
import { ReportsService } from 'src/reports/reports.service';
import { GetSecondReportDTO } from 'src/reports/dto/GetSecondReport.dto';

@Injectable()
export class ProductsService {
  private readonly getProductsLimit: number = 5;

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly configService: ConfigService,
    private readonly reportsService: ReportsService,
  ) {
    this.getProductsLimit = parseInt(
      this.configService.get<string>('GET_PRODUCTS_LIMIT'),
      10,
    );
  }

  async sync(products: CreateProductDTO[]) {
    const result = await this.productModel.bulkWrite(
      products.map(({ sys, fields }) => ({
        updateOne: {
          filter: { entryId: sys.id },
          update: {
            $set: {
              ...fields,
              ...{ createdAt: sys.createdAt, updatedAt: sys.updatedAt },
            },
          },
          upsert: true,
        },
      })),
      { ordered: true },
    );

    if (result.upsertedCount > 0) {
      await this.reportsService.increaseReportCounterByName(
        'products:upserted:counter',
        result.upsertedCount,
      );
    }

    return result;
  }

  async get(query: GetProductsRequestDTO) {
    const result = await this.productModel.aggregate([
      {
        $match: {
          ...(query.name && { name: { $regex: new RegExp(query.name, 'i') } }),
          ...(query.category && {
            category: { $regex: new RegExp(query.category, 'i') },
          }),
          ...(query.price && {
            price: { $gte: query.price[0], $lte: query.price[1] },
          }),
        },
      },
      {
        $facet: {
          metaData: [
            {
              $count: 'total',
            },
            {
              $addFields: {
                page: query.page,
                total: {
                  $ceil: { $divide: ['$total', this.getProductsLimit] },
                },
              },
            },
          ],
          data: [
            {
              $skip: (query.page - 1) * this.getProductsLimit,
            },
            {
              $limit: this.getProductsLimit,
            },
          ],
        },
      },
    ]);

    const response = result[0];
    response.metaData = {
      ...response.metaData[0],
      count: response.data.length,
    };

    return response;
  }

  async deleteById(id: string) {
    const result = await this.productModel.deleteOne({ entryId: id });
    if (result.deletedCount > 0) {
      await this.reportsService.increaseReportCounterByName(
        'products:deleted:counter',
        result.deletedCount,
      );
      await this.reportsService.pushIdInReportByName(
        'products:deleted:ids',
        id,
      );
    }
    return result;
  }

  async getSecondReportData(query: GetSecondReportDTO) {
    const result = await this.productModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: query.date[0],
            $lte: query.date[1],
          },
        },
      },
      {
        $group: {
          _id: 0,
          total: { $count: {} },
          in: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ['$price', query.price[0]] },
                    { $lte: ['$price', query.price[1]] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $unset: '_id' },
    ]);

    const response = { in: 0, out: 0 };
    if (result[0]?.total > 0) {
      response.in = parseFloat(
        ((result[0].in / result[0].total) * 100).toFixed(2),
      );
      response.out = parseFloat(
        (((result[0].total - result[0].in) / result[0].total) * 100).toFixed(2),
      );
    }

    return response;
  }

  async getThirdReportData() {
    const result = await this.productModel.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } },
    ]);

    return result;
  }
}
