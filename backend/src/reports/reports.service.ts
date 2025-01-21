import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from 'src/schemas/report.schema';

export enum ReportType {
  COUNTER = 'COUNTER',
  IDS = 'IDS',
}

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<Report>) {}

  async getReportByName(name: string, type: string) {
    let report = await this.reportModel.findOne({ name, type });
    if (!report) {
      const info = type === ReportType.COUNTER ? { counter: 0 } : { ids: [] };
      report = new this.reportModel({ name, type, info });
      await report.save();
    }

    return report;
  }

  async increaseReportCounterByName(name: string, inc: number) {
    const report = await this.getReportByName(name, ReportType.COUNTER);
    if (report) {
      report.info.counter += inc;
      report.markModified('info.counter');
      await report.save();
    }
  }

  async pushIdInReportByName(name: string, id: string) {
    const report = await this.getReportByName(name, ReportType.IDS);
    if (report) {
      report.info.ids.push(id);
      report.markModified('info.ids');
      await report.save();
    }
  }

  async existIdInReportByName(name: string, id: string) {
    const exists = await this.reportModel.exists({
      name,
      type: ReportType.IDS,
      'info.ids': id,
    });

    return exists;
  }

  async getDeletedPercent() {
    const deleted = await this.getReportByName(
      'products:deleted:counter',
      ReportType.COUNTER,
    );
    const upserted = await this.getReportByName(
      'products:upserted:counter',
      ReportType.COUNTER,
    );

    if (deleted.info.counter > 0 && upserted.info.counter > 0) {
      return parseFloat(
        ((deleted.info.counter / upserted.info.counter) * 100).toFixed(2),
      );
    }

    return 0;
  }
}
