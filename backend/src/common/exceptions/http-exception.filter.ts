import { AUTH_ERROR, INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR } from '../constants/response-messages';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { CustomLogger } from '../logger/logger';
import { Response } from 'express';

/**
 * Exception filtering
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Logger for error messages
   */
  private readonly logger = new CustomLogger(HttpExceptionFilter.name);
  /**
   * Catches and sanitizes exception responses
   * @param exception
   * @param host
   */
  catch(error: HttpException, host: ArgumentsHost) {
    this.logger.error(error);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.getStatus();
    const notProduction = process.env.NODE_ENV !== 'prod';
    const returnData: {
      message: string | string[];
      error?: string;
      stack?: string;
    } = {
      message: INTERNAL_SERVER_ERROR,
      error: notProduction ? error.message : undefined,
      stack: notProduction ? error.stack : undefined,
    };
    if (status === HttpStatus.NOT_FOUND) {
      returnData.message = NOT_FOUND_ERROR;
      return response.status(status).json(returnData);
    }
    if (status === HttpStatus.UNAUTHORIZED) {
      returnData.message = AUTH_ERROR;
      return response.status(status).json(returnData);
    }
    if (status === HttpStatus.BAD_REQUEST) {
      if (error.message.endsWith('-error') || error.message[0].endsWith('-error')) {
        returnData.message = error.message;
        return response.status(HttpStatus.BAD_REQUEST).json(returnData);
      }
      const errorResponse = error.getResponse();
      if (errorResponse?.[0]?.endsWith('-error')) {
        returnData.message = errorResponse as string[];
        return response.status(HttpStatus.BAD_REQUEST).json(returnData);
      }
    }
    return response.status(status).json(returnData);
  }
}
