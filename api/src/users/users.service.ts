import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Ensure this import is present
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
    return await this.userModel.find({});
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
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
    return await this.userModel
      .findByIdAndUpdate(user.id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return await this.userModel.findByIdAndDelete(user.id).exec();
  }
}
