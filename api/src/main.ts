import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
