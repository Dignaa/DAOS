import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty,
  Length,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsString({ message: 'Name must be a string.' })
  @Length(3, 50, {
    message: 'Name must be between 3 and 50 characters long.',
  })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(8, 100, {
    message: 'Password must be between 8 and 100 characters long.',
  })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsOptional()
  @Length(10, 15, {
    message:
      'Phone number must be between 10 and 15 characters long, if provided.',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsBoolean()
  seeking?: boolean;
}
