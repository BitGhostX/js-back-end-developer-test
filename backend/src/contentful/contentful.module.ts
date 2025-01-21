import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ReportsModule } from 'src/reports/reports.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule, ReportsModule],
  providers: [ContentfulService],
})
export class ContentfulModule {}
