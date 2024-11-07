import {
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Length(10, 500)
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsString()
  instrument: string;

  @IsDate()
  date: Date;

  groupId: Types.ObjectId;
}