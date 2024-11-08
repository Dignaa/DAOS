import { Expose } from 'class-transformer'; // Decorator to expose properties

export class GroupDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;
}
