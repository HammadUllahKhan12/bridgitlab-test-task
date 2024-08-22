import { ApiProperty } from '@nestjs/swagger';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_TASK_ID_ERROR,
  INVALID_USER_ERROR,
  TASK_NOT_FOUND_ERROR,
  TASK_SUBMITTED_ERROR,
  TASK_UPLOADS_EXCEEDED_ERROR,
} from 'src/common/constants/response-messages';
import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator';
import { SuccessResponseDto } from 'src/common/responses';
import { Transform, Type } from 'class-transformer';

/**
 * Querystring data for updating a task specifying which task
 */
export class BrokerTasksUpdateQueryDto {
  /**
   * The task id
   */
  @ApiProperty({
    description: 'The task id',
  })
  @IsInt({ message: INVALID_TASK_ID_ERROR })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @Type(() => Number)
  taskId: number;
}

/**
 * Post data for updating a task attaching a file and optionally completing
 */
export class BrokerTasksUpdateBodyDto {
  /**
   * The uploaded file as a base64 string'
   */
  @ApiProperty({
    description: 'The uploaded file as a base64 string',
  })
  @IsString()
  file: string;
  /**
   * Flag to complete the task when all files are uploaded
   */
  @ApiProperty({
    description: 'Flag to complete the task when all files are uploaded',
  })
  @IsBoolean()
  @Type(() => Boolean)
  complete?: boolean;
}

/**
 * Response when updating task
 */
export class BrokerTasksUpdateResponseDto extends SuccessResponseDto {}

/**
 * List of error codes this endpoint may return
 */
export const UPDATE_TASK_ERRORS = [
  INTERNAL_SERVER_ERROR,
  INVALID_USER_ERROR,
  TASK_NOT_FOUND_ERROR,
  TASK_SUBMITTED_ERROR,
  TASK_UPLOADS_EXCEEDED_ERROR,
];

/**
 * Bad request error responses
 */
export class BrokerTasksUpdateBadRequestResponseDto {
  /**
   * The error code
   */
  @ApiProperty({
    description: 'The error code',
    enum: UPDATE_TASK_ERRORS,
  })
  @IsEnum(UPDATE_TASK_ERRORS)
  message: string;
}
