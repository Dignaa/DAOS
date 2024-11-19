import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @IsString()
  @Length(3, 100, { message: 'Titel skal være mellem 3 og 100 tegn' })
  @IsNotEmpty({ message: 'Indtast venligst en titel' })
  title: string;

  @Length(10, 500, { message: 'Beskrivelse skal være mellem 10 og 500 tegn' })
  @IsNotEmpty({ message: 'Indtast venligst en beskrivelse' })
  @IsString({ message: 'Indtast venligst en beskrivelse' })
  description: string;

  @IsString()
  instrument: string;

  groupId: Types.ObjectId;
}
