import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

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
  @IsString()
  avatarUrl?: string;

  @Prop({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true, index: '2dsphere' },
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
