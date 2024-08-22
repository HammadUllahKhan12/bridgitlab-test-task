import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrokerCurrentUserDto, BrokerCurrentUserResponseDto } from './current-user.dto';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import { BrokerGuard } from '../broker.guard';
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/response-messages';
import { InternalServerErrorResponseDto } from 'src/common/responses';
import User from 'src/common/decorators/user';

/**
 * Broker API endpoint for viewing their account information and checking if
 * they are signed in
 */
@Controller('brokers')
@ApiTags('Broker API')
export class BrokerCurrentUserController {
  /**
   * Fetches the current user's information if their token is valid
   * @param query {BrokerCurrentUserRequestDto} The query payload
   * @returns {BrokerCurrentUserResponseDto}
   */
  @Get('current-user')
  @UseGuards(BrokerGuard)
  @ApiBearerAuth('BROKER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Fetches the current user's information if their token is valid",
    description: "Fetches the information stached in the user's JWT token to expose that information to clients",
  })
  @ApiOkResponse({
    type: BrokerCurrentUserResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  async find(@User() user: BrokerDto): Promise<BrokerCurrentUserResponseDto> {
    return {
      success: true,
      broker: user as BrokerCurrentUserDto,
    };
  }
}
