import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import {
  INVALID_MAXIMUM_DATE_ERROR,
  INVALID_MINIMUM_DATE_ERROR,
  MINIMUM_DATE_EXCEEDS_MAXIMUM_DATE_ERROR,
} from 'src/common/constants/response-messages';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { SuccessResponseDto } from 'src/common/responses';
import { Task } from 'src/models/tasks/task.entity';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Transform, Type } from 'class-transformer';

/**
 * Querystring parameters for listing applications
 */
export class BrokerTasksListRequestDto {
  /**
   * Optional flag for task status
   */
  @ApiPropertyOptional({
    description: 'Optional flag for task status',
    enum: TaskStatus,
    enumName: 'TaskStatus',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status?: TaskStatus;
  /**
   * Optional minimum date for the task due date
   */
  @ApiPropertyOptional({
    description: 'Minimum date for the task due date',
  })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly minimumDateDue?: Date;
  /**
   * Optional maximum date for the task due date
   */
  @ApiPropertyOptional({
    description: 'Maximum date for the task due date',
  })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly maximumDateDue?: Date;
  /**
   * Optional minimum date for the task completion date
   */
  @ApiPropertyOptional({
    description: 'Minimum date for the task completion date',
  })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly minimumDateCompleted?: Date;
  /**
   * Optional maximum date for the task completion date
   */
  @ApiPropertyOptional({
    description: 'Maximum date for the task completion date',
  })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly maximumDateCompleted?: Date;
}

export class BrokerTask extends PickType(Task, ['id', 'createdAt', 'status', 'title']) {}

/**
 * The response data
 */
export class BrokerTasksListResponseDto extends SuccessResponseDto {
  /**
   * The broker's tasks
   */
  readonly tasks: BrokerTask[];
}

/**
 * Error codes this endpoint can return
 */
const BAD_REQUEST_ERRORS = [
  INVALID_MINIMUM_DATE_ERROR,
  INVALID_MAXIMUM_DATE_ERROR,
  MINIMUM_DATE_EXCEEDS_MAXIMUM_DATE_ERROR,
];

/**
 * The response data when an error code is returned
 */
export class BrokerTasksListBrokerApplicationsListBadRequestResponseDto {
  /**
   * Failure message and reason
   */
  @ApiProperty({
    description: 'Failure message and reason',
    enum: BAD_REQUEST_ERRORS,
  })
  @IsEnum(BAD_REQUEST_ERRORS)
  readonly message: string;
}
