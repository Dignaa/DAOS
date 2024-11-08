import {
  BadRequestException,
  Injectable,
  NotFoundException,
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

    const groupsWithPosts = await Promise.all(
      groups.map(async (group) => {
        const posts = await this.getPostsForGroup(group.id);
        return { ...group.toObject(), posts: posts };
      }),
    );
    return groupsWithPosts;
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');

    const group = await this.groupModel.findById(id).exec();

    if (!group) throw new NotFoundException('No group found with this ID');

    const posts = await this.getPostsForGroup(group.id);
    return { ...group.toObject(), posts: posts };
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    const toUpdate = await this.groupModel
      .findByIdAndUpdate(group._id, updateGroupDto, { new: true })
      .exec();
    const posts = await this.getPostsForGroup(toUpdate.id);
    return { ...toUpdate.toObject(), posts: posts };
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    return await this.groupModel.deleteOne(group._id).exec();
  }

  async addUser(groupId: string, userId: string) {
    const group = await this.findOne(groupId);
    return await this.groupModel
      .findByIdAndUpdate(
        group._id,
        { $addToSet: { userIds: new Types.ObjectId(userId) } }, // use $addToSet to avoid duplicates
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
    return this.groupModel.find({ userIds: new Types.ObjectId(userId) });
  }

  private async getPostsForGroup(groupId: string) {
    const posts = await this.postModel
      .find({ groupId: new ObjectId(groupId) })
      .select('id title instrument')
      .exec();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      instrument: post.instrument,
    }));
  }
}
