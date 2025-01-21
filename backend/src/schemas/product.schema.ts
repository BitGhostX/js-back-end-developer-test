import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Product {
  @Prop({ unique: true, required: true, index: true })
  entryId: string;

  @Prop({ unique: true, required: true, index: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: ['USD'] })
  currency: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
