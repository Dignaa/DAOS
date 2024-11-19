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
  @IsUrl({}, { message: 'Indtast venligst et link' })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Indtast venligst et link' })
  link?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Indtast venligst et nummer' })
  noOfActiveMembers?: number;

  @IsOptional()
  adminId: Types.ObjectId;

  @IsOptional()
  @IsArray()
  userIds?: Types.ObjectId[];
}
