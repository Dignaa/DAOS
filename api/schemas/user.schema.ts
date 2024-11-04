import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  avatarURL: string;

  @Prop()
  lastLoggedIn: string;
}

export const userSchema = SchemaFactory.createForClass(User);
