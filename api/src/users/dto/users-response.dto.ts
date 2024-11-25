import { Exclude, Expose } from 'class-transformer';
import { GroupDto } from './group-user-response.dto';

@Exclude()
export class UsersResponseDto {
  @Expose()
  _id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  description?: string;

  @Expose()
  address?: string;

  @Expose()
  seeking?: boolean;

  @Expose()
  lastLoggedIn?: Date;

  @Expose()
  createdAt?: Date;

  @Expose()
  instruments?: string[];

  @Expose()
  groups?: GroupDto[];

  @Expose()
  posts?: string[];
}
