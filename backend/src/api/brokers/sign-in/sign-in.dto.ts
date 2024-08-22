import {
  ACCOUNT_NOT_ACTIVE_ERROR,
  EMAIL_NOT_FOUND_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
} from 'src/common/constants/response-messages';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { SuccessResponseDto } from 'src/common/responses';

export class BrokerSignInBodyDto {
  /**
   * Account email address for the broker
   */
  @ApiProperty({
    description: 'Account email address for the broker',
  })
  @IsEmail({}, { message: INVALID_EMAIL_ERROR })
  email: string;
  /**
   * Account password for the broker
   */
  @ApiProperty({
    description: 'Account password for the broker',
  })
  @IsString({ message: INVALID_PASSWORD_ERROR })
  password: string;
}

/**
 * Response when successfully authenticating
 */
export class BrokerSignInResponseDto extends SuccessResponseDto {
  /**
   * The session token
   */
  @ApiProperty({
    description: 'The session token',
  })
  @IsString()
  token: string;
}

/**
 * Error codes this endpoint can return
 */
const BAD_REQUEST_ERRORS = [EMAIL_NOT_FOUND_ERROR, INVALID_PASSWORD_ERROR, ACCOUNT_NOT_ACTIVE_ERROR];

/**
 * The response data when an error code is returned
 */
export class BrokerSignInBadRequestResponseDto {
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
