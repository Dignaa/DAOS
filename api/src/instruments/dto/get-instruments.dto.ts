import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetInstrumentsDto {
  @Expose()
  type: string;
}
