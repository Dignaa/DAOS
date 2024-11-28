import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Instrument {
  @Prop()
  type: string;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
