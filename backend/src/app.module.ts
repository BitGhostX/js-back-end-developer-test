import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulModule } from './contentful/contentful.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URL'),
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    ContentfulModule,
    ProductsModule,
    ReportsModule,
  ],
})
export class AppModule {}
