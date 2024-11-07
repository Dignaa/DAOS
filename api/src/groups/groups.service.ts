import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from 'src/schemas/group.schema';
import { Model, Types } from 'mongoose';

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
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');

    const group = await this.groupModel.findById(id).exec();

    if (!group) throw new NotFoundException('No group found with this ID');
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    return await this.groupModel
      .findByIdAndUpdate(group.id, updateGroupDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    return await this.groupModel.deleteOne(group.id).exec();
  }

  async addUser(groupId: string, userId: string) {
    const group = await this.findOne(groupId);
    return await this.groupModel
      .updateOne(
        group.id,
        { $addToSet: { userIds: new Types.ObjectId(userId) } }, // use $addToSet to avoid duplicates
        { new: true },
      )
      .exec();
  }

  async removeUser(groupId: string, userId: string) {
    const group = await this.findOne(groupId);
    return await this.groupModel
      .updateOne(
        group.id,
        { $pull: { userIds: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();
  }

  async getGroupsForUser(userId: string) {
    return this.groupModel.find({ userIds: new Types.ObjectId(userId) });
  }
}
