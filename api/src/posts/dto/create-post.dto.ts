import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  author: string;
}
