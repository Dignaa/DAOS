import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Prop()
  @IsOptional()
  @IsString()
  description?: string;

  @Prop({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @Prop({
    type: { type: String, enum: ['Point'], required: false },
    coordinates: { type: [Number], required: false, index: '2dsphere' },
  })
  location?: {
    type: 'Point';
    coordinates?: [number, number]; // [longitude, latitude]
  };

  @Prop()
  @IsOptional()
  @IsString()
  link?: string;

  @Prop({ default: 1 })
  @IsOptional()
  @IsNumber()
  noOfActiveMembers?: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  userIds: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
