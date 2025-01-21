import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class Report {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['COUNTER', 'IDS'] })
  type: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  info: any;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
