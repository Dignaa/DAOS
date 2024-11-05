import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../../schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), // Import the Post schema
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
