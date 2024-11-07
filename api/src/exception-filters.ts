import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let responseMessage = exception.getResponse();

    if (typeof responseMessage === 'string') {
      responseMessage = { message: responseMessage };
    }

    const errorResponse = {
      ...responseMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
    };

    response.status(status).json(errorResponse);
  }
}
