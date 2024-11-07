import { IsDate, IsOptional, IsString, Length } from 'class-validator';
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
  instrument?: string;

  @IsDate()
  date: Date;
}