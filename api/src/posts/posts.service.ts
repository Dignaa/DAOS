import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Group, GroupDocument } from 'src/schemas/group.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
  ) {}

  // Create a post
  async create(createPostDto: CreatePostDto) {
    const newPost = new this.postModel({
      ...createPostDto,
      groupId: new Types.ObjectId(createPostDto.groupId),
      createdAt: Date.now(),
      location: {
        type: 'Point',
        coordinates: [-122.0838, 37.421998], // [longitude, latitude]
      },
    });
    const post = await newPost.save();

    const group = await this.getGroupForPost(post.groupId);
    return { ...post.toObject(), group: { ...group } };
  }

  // Find all posts
  async findAll() {
    const posts = await this.postModel.find({});

    const postWithGroup = await Promise.all(
      posts.map(async (post) => {
        const group = await this.getGroupForPost(post.groupId);
        return { ...post.toObject(), group };
      }),
    );
    return postWithGroup;
  }

  // Find a post by ID
  async findOne(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid Post ID format: ${id}`);
    }

    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const group = await this.getGroupForPost(post.groupId);
    return { ...post.toObject(), group };
  }

  // Update a post by ID
  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    const toUpdate = await this.postModel
      .findByIdAndUpdate(post._id, updatePostDto, { new: true })
      .exec();

    const group = await this.getGroupForPost(post.groupId);
    return { ...toUpdate.toObject(), group: { ...group } };
  }

  // Delete a post by ID
  async remove(id: string) {
    const post = await this.findOne(id);

    return await this.postModel.findByIdAndDelete(post._id).exec();
  }

  // Get the group for a specific post
  private async getGroupForPost(groupId: ObjectId) {
    const group = await this.groupModel.findOne({ _id: groupId }).exec();
    return group;
  }
}
