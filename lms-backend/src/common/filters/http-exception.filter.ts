import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

// Filter ini menyeragamkan format response error di seluruh API
// sesuai format di dokumentasi: { success, message, errors }
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      success: false,
      message: exceptionResponse?.message || exception.message,
      errors: Array.isArray(exceptionResponse?.message) ? exceptionResponse.message : undefined,
    });
  }
}
