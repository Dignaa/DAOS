import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Prop({ required: false })
  @IsString()
  description: string;

  @Prop({ required: false })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @Prop({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @Prop({
    type: { type: String, enum: ['Point'], required: false },
    coordinates: { type: [Number], required: false, index: '2dsphere' },
  })
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };

  @Prop({ required: true })
  @IsBoolean()
  seeking: boolean;

  @Prop({ required: false, type: Date })
  lastLoggedIn?: Date;

  @Prop({ required: false, type: Date })
  createdAt?: Date;

  @Prop({ required: false })
  instruments: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
