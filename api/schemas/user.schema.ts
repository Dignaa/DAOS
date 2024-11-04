import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsOptional, IsString } from 'class-validator';
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
  @IsOptional()
  @IsString()
  avatarURL?: string;

  @Prop({ required: false, type: Date })
  lastLoggedIn?: Date; // Change to Date type for better date handling
}

export const UserSchema = SchemaFactory.createForClass(User);
