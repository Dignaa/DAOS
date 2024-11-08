import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateGroupDto {
  @IsNotEmpty({ message: "The name can't be empty" })
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsNumber()
  noOfActiveMembers?: number;

  @IsOptional()
  adminId: Types.ObjectId;

  @IsOptional()
  @IsArray()
  userIds?: Types.ObjectId[];
}
