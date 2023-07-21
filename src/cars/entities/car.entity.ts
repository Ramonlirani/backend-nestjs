import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateCarDto } from '../dto/create-car.dto';

export type CarDocument = HydratedDocument<CreateCarDto>;

@Schema()
export class Car {
  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  color: string;

  @Prop()
  id: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
