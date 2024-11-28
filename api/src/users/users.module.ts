import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { GroupsService } from 'src/groups/groups.service';
import { Group, GroupSchema } from 'src/schemas/group.schema';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { Instrument, InstrumentSchema } from 'src/schemas/instrument.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, GroupsService],
  exports: [UsersService, GroupsService],
})
export class UsersModule {}
