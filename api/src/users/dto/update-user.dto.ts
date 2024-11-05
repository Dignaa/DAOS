import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
