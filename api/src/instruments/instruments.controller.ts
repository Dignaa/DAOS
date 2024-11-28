import { Controller, Get } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { plainToInstance } from 'class-transformer';
import { GetInstrumentsDto } from './dto/get-instruments.dto';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Get()
  findAll() {
    return plainToInstance(
      GetInstrumentsDto,
      this.instrumentsService.findAll(),
    );
  }
}
