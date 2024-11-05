import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'schemas/post.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto) {
    //call to openmaps

    const post = new this.postModel({
      ...createPostDto,
      createdAt: Date.now(),
      location: {
        type: 'Point',
        coordinates: [-122.0838, 37.421998], // [longitude, latitude]
      },
    });

    // Save and return the user
    return await post.save();
  }

  async findAll() {
    return await this.postModel.find({});
  }

  async findOne(id: string) {
    return await this.postModel.findById(new ObjectId(id)).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel
      .findByIdAndUpdate(new ObjectId(id), updatePostDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.postModel.findByIdAndDelete(new ObjectId(id)).exec();
  }
}
