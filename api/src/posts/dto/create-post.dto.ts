import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { PostType, Instrument } from '../entities/enum/post.enum';

export class CreatePostDto {
  @IsEnum(PostType)
  type: PostType;

  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(10, 500)
  description: string;

  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsEnum(Instrument)
  instrument: Instrument;

  @IsString()
  userId: string;
}
