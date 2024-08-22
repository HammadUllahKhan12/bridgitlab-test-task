import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Application } from 'src/models/applications/application.entity';
import { ApplicationStatus } from 'src/enums/application-status.enum';
import {
  INVALID_MAXIMUM_DATE_ERROR,
  INVALID_MINIMUM_DATE_ERROR,
  MINIMUM_DATE_EXCEEDS_MAXIMUM_DATE_ERROR,
} from 'src/common/constants/response-messages';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { SuccessResponseDto } from 'src/common/responses';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Transform, Type } from 'class-transformer';

/**
 * Querystring parameters for listing applications
 */
export class BrokerApplicationsListRequestDto {
  /**
   * Optional flag for application status
   */
  @ApiPropertyOptional({
    description: 'Optional flag for application status',
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  @IsArray()
  @IsEnum(ApplicationStatus, { each: true })
  @IsOptional()
  readonly status?: ApplicationStatus[];
  /**
   * Optional flag for applications with incomplete tasks
   */
  @ApiPropertyOptional({
    description: 'Optional flag for applications with incomplete tasks',
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  readonly completed?: TaskStatus.Completed | TaskStatus.Pending;
  /**
   * Optional minimum date for the application submission
   */
  @ApiPropertyOptional({
    description: 'Minimum date for the application submission',
  })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly minimumDate?: Date;
  /**
   * Optional maximum date for the application submission
   */
  @ApiPropertyOptional({
    description: 'Maximum date for the application submission',
  })
  @Transform(({ value }) => (value && !isNaN(value) ? value : null))
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly maximumDate?: Date;
}

export class ApplicationDto extends PickType(Application, [
  'applicantName',
  'applicantEmail',
  'applicantMobilePhoneNumber',
  'applicantAddress',
  'annualIncomeBeforeTax',
  'incomingAddress',
  'incomingDeposit',
  'incomingPrice',
  'incomingStampDuty',
  'loanAmount',
  'loanDuration',
  'monthlyExpenses',
  'outgoingAddress',
  'outgoingMortgage',
  'outgoingValuation',
  'savingsContribution',
]) {
  @IsString()
  applicantName: string;

  @IsString()
  applicantEmail: string;

  @IsString()
  applicantMobilePhoneNumber: string;

  @IsString()
  applicantAddress: string;

  @IsString()
  incomingAddress: string;

  @IsString()
  outgoingAddress: string;
}

export class BrokerApplicationPostResponseDto extends SuccessResponseDto {
  readonly loanAmount: number;
}

class BrokerApplicationDto extends PickType(Application, [
  'id',
  'applicationId',
  'createdAt',
  'status',
  'loanAmount',
  'loanDuration',
  'applicantName',
  'incomingAddress',
  'outgoingAddress',
]) {}

/**
 * The response data
 */
export class BrokerApplicationsListResponseDto extends SuccessResponseDto {
  /**
   * The broker's applications
   */
  readonly applications: BrokerApplicationDto[];
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
export class BrokerApplicationsListBadRequestResponseDto {
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
