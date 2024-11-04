import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'schemas/user.schema';

export type CatDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop()
  type: Enumerator;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  zipCode: string;

  @Prop()
  city: string;

  @Prop()
  createdAt: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;
}

export const userSchema = SchemaFactory.createForClass(Post);
