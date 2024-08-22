import { ApiProperty } from '@nestjs/swagger';
import { INTERNAL_SERVER_ERROR } from './constants/response-messages';
import { IsEnum } from 'class-validator';

export class InternalServerErrorResponseDto {
  /**
   * The internal-error code
   */
  @ApiProperty({
    description: 'The error code',
    enum: [INTERNAL_SERVER_ERROR],
  })
  @IsEnum([INTERNAL_SERVER_ERROR])
  message: string;
}

export class SuccessResponseDto {
  /**
   * Success status indicating the request completed
   */
  @ApiProperty({
    description: 'Success status indicating the request completed',
  })
  readonly success = true;
}
