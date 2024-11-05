import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PostType, Instrument } from '../entities/enum/post.enum';

export class UpdatePostDto {
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
  group?: string;

  @IsOptional()
  @IsEnum(Instrument)
  instrument?: Instrument;
}
