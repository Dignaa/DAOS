import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'schemas/post.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';

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
    return post.save();
  }

  findAll() {
    return this.postModel.find({});
  }

  findOne(id: string) {
    return this.postModel.findById(new Types.ObjectId(id)).exec();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
