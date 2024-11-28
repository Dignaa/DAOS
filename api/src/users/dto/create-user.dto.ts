import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty,
  Length,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Brug venligst en rigtig email adresse' })
  email: string;

  @IsString({ message: 'Indtast venligst dit navn' })
  @Length(2, 100, {
    message: 'Dit navn skal være mellem 2 og 100 bogstaver',
  })
  @IsNotEmpty({ message: 'Indtast venligst dit navn' })
  name: string;

  @IsString({ message: 'Indtast venligsst en adgangskode' })
  @Length(8, 100, {
    message: 'Din adgangskode skal være mellem 8 og 100 tegn',
  })
  @IsNotEmpty({ message: 'Indtast venligsst en adgangskode' })
  password: string;

  @IsString({ message: 'Indtast venligsst et telefonnummer' })
  @Length(6, 12, {
    message: 'Dit telefonnummer skal være mellem 6 og 12 tegn',
  })
  @IsOptional()
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
