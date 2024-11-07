import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  // Create a post
  async create(createPostDto: CreatePostDto) {
    const post = new this.postModel({
      ...createPostDto,
      createdAt: Date.now(),
      location: {
        type: 'Point',
        coordinates: [-122.0838, 37.421998], // [longitude, latitude]
      },
    });

    return await post.save();
  }

  // Find all posts
  async findAll() {
    const posts = await this.postModel.find({});
    return posts;
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
    return post;
  }

  // Update a post by ID
  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    return await this.postModel
      .findByIdAndUpdate(post.id, updatePostDto, { new: true })
      .exec();
  }

  // Delete a post by ID
  async remove(id: string) {
    const post = await this.findOne(id);

    return await this.postModel.findByIdAndDelete(post.id).exec();
  }
}
