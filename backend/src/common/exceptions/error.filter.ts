import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { CustomLogger } from '../logger/logger';
import { INTERNAL_SERVER_ERROR } from '../constants/response-messages';
import { Response } from 'express';

/**
 * Catch-all error filtering for Sequelize or any other
 * exceptions that are thrown that are not a supported
 * HttpException in an API endpoint
 */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  /**
   * Logger for error messages
   */
  private readonly logger = new CustomLogger(ErrorFilter.name);

  /**
   * Catches and sanitizes exception responses
   * @param exception
   * @param host
   */
  catch(error: Error, host: ArgumentsHost) {
    this.logger.error(error);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const notProduction = process.env.NODE_ENV !== 'prod';
    if (error instanceof HttpException) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        error: notProduction ? error.message : undefined,
        stack: notProduction ? error.stack : undefined,
      });
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: INTERNAL_SERVER_ERROR,
      error: notProduction ? error.message : undefined,
      stack: notProduction ? error.stack : undefined,
    });
  }
}
