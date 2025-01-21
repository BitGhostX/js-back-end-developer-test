import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsService } from 'src/products/products.service';
import { ReportsService } from './reports.service';
import { GetSecondReportDTO } from './dto/GetSecondReport.dto';

@ApiBearerAuth()
@ApiTags('reports')
@ApiUnauthorizedResponse({ description: 'Unauthorized Bearer Auth' })
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('first')
  @ApiOperation({ summary: 'Get first report' })
  async first() {
    const deletedPercent = await this.reportsService.getDeletedPercent();
    return { deletedPercent };
  }

  @Get('second')
  @ApiOperation({ summary: 'Get second report' })
  async second(@Query() query: GetSecondReportDTO) {
    const response = await this.productsService.getSecondReportData(query);

    return {
      inPriceRangePercent: response.in,
      outPriceRangePercent: response.out,
    };
  }

  @Get('third')
  @ApiOperation({ summary: 'Get third report' })
  async third() {
    const response = await this.productsService.getThirdReportData();

    return response;
  }
}
