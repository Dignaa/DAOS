import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from 'src/schemas/group.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Post } from 'src/schemas/post.schema';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new this.groupModel({
      ...createGroupDto,
    });

    return await group.save();
  }

  async findAll() {
    const groups = await this.groupModel.find({});

    const groupWithPosts = await Promise.all(
      groups.map(async (group) => {
        const posts = await this.getPostsForGroup(group.id);
        return { ...group.toObject(), posts: posts };
      }),
    );
    return groupWithPosts;
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');

    const group = await this.groupModel.findById(id).exec();

    if (!group) throw new NotFoundException('No group found with this ID');

    const posts = await this.getPostsForGroup(group.id);
    return { ...group.toObject(), posts: posts };
  }

  async update(userId: string, id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);

    if (group === null) {
      throw new BadRequestException();
    }

    if (group.adminId.toString() === userId) {
      const toUpdate = await this.groupModel
        .findByIdAndUpdate(group._id, updateGroupDto, { new: true })
        .exec();
      const posts = await this.getPostsForGroup(toUpdate.id);
      return { ...toUpdate.toObject(), posts: posts };
    }
    throw new UnauthorizedException();
  }

  async remove(userId: string, id: string): Promise<void> {
    const group = await this.findOne(id);

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    if (group.adminId.toString() === userId) {
      await this.postModel.deleteMany({ groupId: group._id }).exec();
      await this.groupModel.deleteOne({ _id: group._id }).exec();
    }
    throw new UnauthorizedException();
  }

  async addUser(groupId: string, userId: string) {
    const group = await this.findOne(groupId);
    return await this.groupModel
      .findByIdAndUpdate(
        group._id,
        { $addToSet: { userIds: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();
  }

  async removeUser(groupId: string, userId: string) {
    const group = await this.findOne(groupId);
    return await this.groupModel
      .findByIdAndUpdate(
        group._id,
        { $pull: { userIds: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();
  }

  async getGroupsForUser(userId: string) {
    return this.groupModel.find({ userIds: userId });
  }

  private async getPostsForGroup(groupId: string) {
    const posts = await this.postModel
      .find({ groupId: new ObjectId(groupId) })
      .exec();
    return posts;
  }

  async isUserAdmin(groupId: string, userId: string): Promise<boolean | null> {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      return null;
    }
    return group.adminId.toString() === userId;
  }

  async isUserInGroup(
    groupId: string,
    userId: string,
  ): Promise<boolean | null> {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw NotFoundException;
    }
    if (group.adminId.toString() === userId) return true;
    return group.userIds.find((id) => id.toString() === userId) ? true : false;
  }

  async deleteMany() {
    await this.groupModel.deleteMany({});
  }
}
