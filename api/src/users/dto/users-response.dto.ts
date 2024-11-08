import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UsersResponseDto {
  @Expose()
  id: string;

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
}
