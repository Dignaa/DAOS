import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instrument } from 'src/schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectModel(Instrument.name)
    private readonly instrumentModel: Model<Instrument>,
  ) {}

  async findAll() {
    return await this.instrumentModel.find({});
  }
}
