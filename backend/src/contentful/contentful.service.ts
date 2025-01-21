import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import * as contentful from 'contentful';
import { CreateProductDTO } from 'src/products/dto/CreateProduct.dto';
import { ProductsService } from 'src/products/products.service';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class ContentfulService {
  private readonly logger = new Logger(ContentfulService.name);
  private client: contentful.ContentfulClientApi<undefined>;
  private getEntriesLimit: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly productsService: ProductsService,
    private readonly reportsService: ReportsService,
  ) {
    this.client = contentful.createClient({
      space: this.configService.get<string>('CONTENTFUL_SPACE_ID'),
      environment: this.configService.get<string>('CONTENTFUL_ENVIRONMENT'),
      accessToken: this.configService.get<string>('CONTENTFUL_ACCESS_TOKEN'),
    });
    this.getEntriesLimit = parseInt(
      this.configService.get<string>('CONTENTFUL_GET_ENTRIES_LIMIT'),
      10,
    );
  }

  @Cron('30 * * * * *')
  async scheduledTask() {
    if (this.client) {
      this.logger.debug('starting sync scheluded task');
      let keepGettingEntries: boolean = true;
      let skip: number = 0;
      const products: CreateProductDTO[] = [];
      while (keepGettingEntries) {
        const response = await this.client.getEntries({
          content_type: this.configService.get<string>(
            'CONTENTFUL_CONTENT_TYPE',
          ),
          select: [
            'fields',
            'sys.id',
            'sys.type',
            'sys.createdAt',
            'sys.updatedAt',
          ],
          order: ['-sys.createdAt'],
          limit: this.getEntriesLimit,
          skip,
        });
        for (const item of response.items) {
          const exist = await this.reportsService.existIdInReportByName(
            'products:deleted:ids',
            item.sys.id,
          );
          if (!exist) {
            products.push(item as unknown as CreateProductDTO);
          }
        }
        keepGettingEntries = skip + this.getEntriesLimit < response.total;
        skip += this.getEntriesLimit;
      }
      const result = await this.productsService.sync(products);
      this.logger.debug('sync scheluded task finished', result);
    }
  }
}
