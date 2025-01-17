import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Group } from '../schemas/group.schema';
import { ObjectId } from 'mongodb';
import { Post } from '../schemas/post.schema';
import { Instrument } from '../schemas/instrument.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Instrument.name)
    private readonly instrumentModel: Model<Instrument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // Check if a user with the same email already exists
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new user instance
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
      seeking: Boolean(createUserDto.seeking),
    });

    // Save and return the user
    return await user.save();
  }

  async findAll() {
    // Get all users
    const users = await this.userModel.find({}).exec();

    const seekingUsers = users.filter((user) => user.seeking === true);

    // Fetch groups for each user using Promise.all
    const usersWithGroups = await Promise.all(
      seekingUsers.map(async (user) => {
        // Get groups for each user
        const groups = await this.getUsersGroups(user.id);
        // Return the user along with their groups
        return { ...user.toObject(), groups: groups };
      }),
    );
    return usersWithGroups;
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const groups = await this.getUsersGroups(user.id);
    return { ...user.toObject(), groups: groups };
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User with email - ${email} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.instruments) {
      for (let index = 0; index < updateUserDto.instruments.length; index++) {
        const instrument = updateUserDto.instruments[index];
        const existsInDb = await this.instrumentModel.findOne({
          type: instrument,
        });
        if (existsInDb === null) {
          updateUserDto.instruments.splice(index, 1);
        }
      }
    }

    const toUpdate = await this.userModel
      .findByIdAndUpdate(user._id, updateUserDto, { new: true })
      .exec();

    const groups = await this.getUsersGroups(toUpdate.id);
    return { ...toUpdate.toObject(), groups: groups };
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return await this.userModel.findByIdAndDelete(user._id).exec();
  }

  // Get the groups for a specific user
  private async getUsersGroups(userId: string) {
    const groups = await this.groupModel
      .find({ userIds: new Types.ObjectId(userId) })
      .select('_id name imageUrl noOfActiveMembers address')
      .exec();

    return groups.map((group) => ({
      _id: group.id,
      name: group.name,
      imageUrl: group.imageUrl,
      noOfActiveMembers: group.noOfActiveMembers,
      address: group.address,
    }));
  }

  public async getPosts(userId) {
    const posts = await this.postModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('')
      .exec();

    const resolvedPosts = await Promise.all(
      posts.map(async (post) => {
        const groupData = await this.groupModel
          .find({ _id: new ObjectId(post.groupId) })
          .select('_id name imageUrl noOfActiveMembers address')
          .exec();

        const processedGroup = groupData.length > 0 ? groupData[0] : null; 

        return {
          _id: post.id,
          title: post.title,
          instrument: post.instrument,
          description: post.description,
          group: processedGroup
            ? {
                _id: processedGroup.id,
                name: processedGroup.name,
                imageUrl: processedGroup.imageUrl,
                noOfActiveMembers: processedGroup.noOfActiveMembers,
                address: processedGroup.address,
              }
            : null,
        };
      }),
    );

    return resolvedPosts;
  }
  async deleteMany() {
    await this.userModel.deleteMany({});
  }
}
