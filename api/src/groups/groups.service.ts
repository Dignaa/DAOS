import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'schemas/group.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new this.groupModel({
      ...createGroupDto,
    });

    return await group.save();
  }

  async findAll() {
    return await this.groupModel.find({});
  }

  async findOne(id: string) {
    return await this.groupModel.findById(new ObjectId(id)).exec();
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    return await this.groupModel
      .findByIdAndUpdate(new ObjectId(id), updateGroupDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.groupModel.findByIdAndDelete(new ObjectId(id)).exec();
  }

  async addUser(groupId: string, userId: string) {
    return await this.groupModel
      .findByIdAndUpdate(
        new ObjectId(groupId),
        { $addToSet: { userIds: new Types.ObjectId(userId) } }, // use $addToSet to avoid duplicates
        { new: true },
      )
      .exec();
  }

  async removeUser(groupId: string, userId: string) {
    return await this.groupModel
      .findByIdAndUpdate(
        new ObjectId(groupId),
        { $pull: { userIds: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();
  }

  async getGroupsForUser(userId: string) {
    return this.groupModel.find({ userIds: new Types.ObjectId(userId) });
  }
}
