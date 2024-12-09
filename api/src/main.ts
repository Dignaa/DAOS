import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));
        return new BadRequestException(formattedErrors);
      },
    }),
  );

  await app.init();

  return app;
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`NestJS app is running locally at http://localhost:${port}`);
    });
  });
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = await bootstrap();
  app.getHttpAdapter().getInstance()(req, res);
};
