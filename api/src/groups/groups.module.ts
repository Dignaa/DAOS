import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/schemas/group.schema';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { PostsService } from 'src/posts/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Post.name, schema: PostSchema },
    ])
  ],
  controllers: [GroupsController],
  providers: [GroupsService, PostsService],
  exports: [GroupsService],
})
export class GroupsModule {}
