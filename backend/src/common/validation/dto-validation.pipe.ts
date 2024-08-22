import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CustomLogger } from '../logger/logger';
import { ValidationError, validate } from 'class-validator';
import { paramCase } from 'param-case';
import { plainToInstance } from 'class-transformer';
import { BrokerApplicationsListRequestDto } from 'src/api/brokers/applications/list-applications/list-applications.dto';

/**
 * Validation pipe for DTO transformations
 */
@Injectable()
export class DtoValidationPipe implements PipeTransform<any> {
  /**
   * Logger for error messages
   */
  private readonly logger = new CustomLogger(DtoValidationPipe.name);

  /**
   * Creates an object out of a metatype
   * @param value
   * @param param1
   * @returns
   */
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<Record<string, unknown>> {
    if (!value || !Object.keys(value).length) {
      return;
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    
    if (metatype === BrokerApplicationsListRequestDto) {
      value.status = value.status?.split(',')
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(this.formatErrors(errors), HttpStatus.BAD_REQUEST);
    }
    return value;
  }
  /**
   * Validates a metatype converted to an object
   * @param metatype
   * @returns {boolean}
   */
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Date, Object];
    return !types.includes(metatype);
  }

  /**
   * Formats error message(s) if an object did not validate
   * @param errors
   * @returns {string}
   */
  formatErrors(validationErrors: ValidationError[]): string | string[] {
    if (!validationErrors?.length) {
      return;
    }
    const errors = [];
    validationErrors.forEach((error) => {
      const constraintKeys = Object.keys(error.constraints);
      const property = paramCase(error.property);
      let errorMessage;
      if (error.constraints[constraintKeys[0]].endsWith('-error')) {
        errorMessage = error.constraints[constraintKeys[0]];
      } else if (error.value === undefined || error.value === null) {
        errorMessage = `missing-${property}-error`;
      } else {
        errorMessage = `invalid-${property}-error`;
      }
      if (errors.indexOf(errorMessage) === -1) {
        errors.push(errorMessage);
      }
    });
    return errors.length === 1 ? errors[0] : errors;
  }
}
