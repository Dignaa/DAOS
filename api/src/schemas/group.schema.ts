import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere',
    },
  })
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop({ type: String })
  link?: string;

  @Prop({ default: 1, type: Number })
  noOfActiveMembers?: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  userIds: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
