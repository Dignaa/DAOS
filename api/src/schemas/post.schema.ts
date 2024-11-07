import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, type: Date })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  groupId: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
