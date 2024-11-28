import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // Transform errors to include field and message
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));

        // Throw BadRequestException with formatted errors
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  const port = 3000;
  await app.listen(port);
  console.log(`Nest application is running on: http://localhost:${port}`);
}
bootstrap();

export const handler = server;
