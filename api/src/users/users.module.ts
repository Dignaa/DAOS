import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { GroupsService } from 'src/groups/groups.service';
import { Group, GroupSchema } from 'src/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, GroupsService],
  exports: [UsersService, GroupsService],
})
export class UsersModule {}
