import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PostType, Instrument } from '../entities/enum/post.enum';

export class UpdatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(10, 500)
  description?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsEnum(Instrument)
  instrument?: Instrument;
}
