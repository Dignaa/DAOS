import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../schemas/group.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Post } from '../schemas/post.schema';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const loc = await this.getLocation(createGroupDto.address);

    const group = new this.groupModel({
      ...createGroupDto,
      location: {
        type: 'Point',
        coordinates: loc,
      },
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
      throw new BadRequestException('Invalid group ID format');

    const group = await this.groupModel.findById(id).exec();

    if (!group) throw new NotFoundException('Group not found');

    const posts = await this.getPostsForGroup(group.id);
    return { ...group.toObject(), posts: posts };
  }

  async update(userId: string, id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);

    if (group === null) {
      throw new BadRequestException();
    }

    if (group.adminId.toString() === userId) {
      let loc;
      console.log(updateGroupDto.address);
      if (updateGroupDto.address === '') {
        loc = [0, 0];
      } else {
        loc = await this.getLocation(updateGroupDto.address);
      }

      const toUpdate = await this.groupModel
        .findByIdAndUpdate(
          group._id,
          {
            ...updateGroupDto,
            adminId: new Types.ObjectId(userId),
            userIds: updateGroupDto.userIds.map((id) => new Types.ObjectId(id)),
            location: {
              type: 'Point',
              coordinates: loc,
            },
          },
          { new: true },
        )
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
    if (!group.adminId.equals(new Types.ObjectId(userId))) {
      throw new UnauthorizedException();
    }
    await this.postModel
      .deleteMany({ groupId: new Types.ObjectId(group._id) })
      .exec();
    await this.groupModel
      .deleteOne({ _id: new Types.ObjectId(group._id) })
      .exec();
  }

  async addUser(groupId: string, userId: string, postId: string) {
    const group = await this.findOne(groupId);

    if (
      group.adminId.toString() === userId ||
      group.userIds.find((id) => id.toString() === userId)
    ) {
      throw new BadRequestException('User already joined in the ensamble');
    }

    var updatedGroup = await this.groupModel
      .findByIdAndUpdate(
        group._id,
        { $addToSet: { userIds: new Types.ObjectId(userId) } },
        { new: true },
      )
      .exec();

    await this.postModel.deleteOne({ _id: new Types.ObjectId(postId) });

    return updatedGroup;
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

  private async getLocation(address: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address,
    )}&format=json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new BadRequestException('Failed to fetch geolocation data.');
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new BadRequestException(
        'Unable to fetch geolocation for the address.',
      );
    }

    // Extract latitude and longitude
    const { lon, lat } = data[0];

    return [parseFloat(lon), parseFloat(lat)];
  }
}
