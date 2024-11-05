import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'schemas/user.schema';
import { PostType } from 'src/posts/entities/enum/post.enum';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop({ type: String, enum: PostType }) // Use the enum for the type
  @IsEnum(PostType)
  type: PostType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true, index: '2dsphere' },
  })
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: false, type: Date })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
