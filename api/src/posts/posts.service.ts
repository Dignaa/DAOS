import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Instrument } from '../schemas/instrument.schema';

interface SearchDTO {
  instrument?: string;
  address?: string;
  range?: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @InjectModel(Instrument.name)
    private readonly instrumentModel: Model<Instrument>,
  ) {}

  // Create a post
  async create(createPostDto: CreatePostDto, userId: string) {
    const newPost = new this.postModel({
      ...createPostDto,
      groupId: new Types.ObjectId(createPostDto.groupId),
      createdAt: Date.now(),
      location: {
        type: 'Point',
        coordinates: [-122.0838, 37.421998], // [longitude, latitude]
      },
      userId: new Types.ObjectId(userId),
      instrument: await this.transformInstrument(createPostDto.instrument),
    });
    const post = await newPost.save();

    const group = await this.getGroupForPost(post.groupId);
    return { ...post.toObject(), ...group };
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
  async update(userId: string, id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (post === null) {
      throw new BadRequestException();
    }

    if (
      post.userId.toString() === userId ||
      post.group.adminId.toString() === userId
    ) {
      updatePostDto.instrument = await this.transformInstrument(
        updatePostDto.instrument,
      );
      const toUpdate = await this.postModel
        .findByIdAndUpdate(
          post._id,
          {
            ...updatePostDto,
            userId: new Types.ObjectId(userId),
            groupId: new Types.ObjectId(updatePostDto.groupId),
          },
          { new: true },
        )
        .exec();

      const group = await this.getGroupForPost(post.groupId);
      return { ...toUpdate.toObject(), group: { group } };
    }
    throw new UnauthorizedException();
  }

  // Delete a post by ID
  async remove(userId: string, id: string) {
    const post = await this.findOne(id);
    if (post === null) {
      throw new BadRequestException();
    }

    if (
      post.userId.toString() === userId ||
      post.group.adminId.toString() === userId
    ) {
      return await this.postModel.findByIdAndDelete(post._id).exec();
    }
    throw new UnauthorizedException();
  }

  // Get the group for a specific post
  private async getGroupForPost(groupId: ObjectId) {
    const group = await this.groupModel.findOne({ _id: groupId }).exec();
    return group;
  }

  private async transformInstrument(instrument: string) {
    const existsInDb = await this.instrumentModel.findOne({
      type: instrument,
    });
    if (existsInDb === null) {
      throw BadRequestException;
    }
    return instrument;
  }

  async search(search: SearchDTO) {
    /* The $geoNear stage must be the first stage in the MongoDB aggregation pipeline, because 
    of optimization MongoDB enforces this requirement and $geoNear must always operate
    on the initial collection before any other stages like $lookup or $unwind.
    Since the location field resides in the Group collection, 
    but $geoNear requires it to be in the root collection, we have to first get groups*/

    const pipeline: any[] = [];

    if (search.address && search.range) {
      const loc = await this.getLocation(search.address);

      if (loc) {
        // Get groups near the location
        const nearbyGroups = await this.groupModel
          .aggregate([
            {
              $geoNear: {
                near: { type: 'Point', coordinates: loc },
                distanceField: 'distance',
                maxDistance: Number(search.range) * 1000,
                spherical: true,
              },
            },
            {
              $project: { _id: 1 }, // Only keep the group IDs
            },
          ])
          .exec();

        const groupIds = nearbyGroups.map((group) => group._id);

        //filter for posts belonging to these groups
        pipeline.push({
          $match: {
            groupId: { $in: groupIds },
          },
        });
      }
    }

    //filter for posts belonging to these groups
    if (search.instrument) {
      console.log('Instrument filter applied');
      pipeline.push({
        $match: {
          instrument: search.instrument,
        },
      });
    }

    // $lookup and $unwind for group details
    pipeline.push({
      $lookup: {
        from: 'groups',
        localField: 'groupId',
        foreignField: '_id',
        as: 'group',
      },
    });
    pipeline.push({
      $unwind: '$group',
    });

    const posts = await this.postModel.aggregate(pipeline).exec();
    return posts;
  }

  private async getLocation(address: string): Promise<[number, number]> {
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
