import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, type: Date })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Ensemble', required: true }) // change to group ref
  groupId: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
