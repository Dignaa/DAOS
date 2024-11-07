import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
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
