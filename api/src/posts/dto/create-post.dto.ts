import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(10, 500)
  description: string;

  @IsString()
  instrument: string;

  @IsDate()
  date: Date;

  groupId: Types.ObjectId;
}
