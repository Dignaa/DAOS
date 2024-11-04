import { IsEnum, IsString, Length, IsNotEmpty, Matches } from 'class-validator';
import { PostType, Instrument } from '../entities/enum/post.enum';

export class CreatePostDto {
  @IsEnum(PostType)
  @IsNotEmpty({ message: 'Post type is required' })
  type: PostType;

  @Length(3, 100)
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Length(10, 500)
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'ZIP code is required' })
  @Matches(/^\d{4}$/, { message: 'ZIP code must be exactly 4 digits' })
  @IsString({ message: 'ZIP code must be a string' })
  zipCode: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City name must be a valid string' })
  city: string;

  @IsEnum(Instrument)
  @IsNotEmpty({ message: 'Instrument is required' })
  instrument: Instrument;
}
