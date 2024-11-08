import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: String, required: false })
  phoneNumber?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: false })
  avatarUrl?: string;

  @Prop({ type: String, required: false })
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

  @Prop({ required: true, type: Boolean })
  seeking: boolean;

  @Prop({ type: Date, required: false })
  lastLoggedIn?: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: [String], required: false })
  instruments?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
