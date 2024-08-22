import * as bcrypt from 'bcryptjs';
import {
  ACCOUNT_NOT_ACTIVE_ERROR,
  EMAIL_NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_PASSWORD_ERROR,
} from 'src/common/constants/response-messages';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BROKER_REPOSITORY } from 'src/common/constants/repositories';
import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { Broker } from 'src/models/brokers/broker.entity';
import { BrokerSignInBadRequestResponseDto, BrokerSignInBodyDto, BrokerSignInResponseDto } from './sign-in.dto';
import { BrokerStatus } from 'src/enums/broker-status.enum';
import { InternalServerErrorResponseDto } from 'src/common/responses';
import { JwtService } from 'src/config/jwt/jwt.service';
import { Public } from 'src/common/decorators/public';
import { formatResponseTable } from 'src/common/swagger';

/**
 * Provides an API endpoint for CRM users to sign in
 */
@Controller('brokers')
@ApiTags('Broker API')
export class BrokerSignInController {
  constructor(
    @Inject(BROKER_REPOSITORY)
    private brokerEntity: typeof Broker,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Authenticates a broker
   * @param email
   * @param password
   * @returns {BrokerSignInResponseDto}
   */
  @Post('sign-in')
  @Public()
  @ApiOperation({
    summary: 'Authenticates a broker',
    description: 'Brokers can create a session token using their email and password.  Their accounts must be active.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: BrokerSignInResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  @ApiBadRequestResponse({
    type: BrokerSignInBadRequestResponseDto,
    description: formatResponseTable({}),
  })
  @ApiBody({
    type: BrokerSignInBodyDto,
  })
  async post(@Body() body: BrokerSignInBodyDto): Promise<BrokerSignInResponseDto> {
    const { email, password } = body;
    const user = await this.brokerEntity.findOne({
      where: {
        email,
      },
    });
    if (!user?.id) {
      throw new HttpException(EMAIL_NOT_FOUND_ERROR, HttpStatus.BAD_REQUEST);
    }
    const validPassword = bcrypt.compareSync(password, user.passwordHash);
    if (validPassword === false) {
      throw new HttpException(INVALID_PASSWORD_ERROR, HttpStatus.BAD_REQUEST);
    }
    if (user.brokerStatus !== BrokerStatus.Active) {
      throw new HttpException(ACCOUNT_NOT_ACTIVE_ERROR, HttpStatus.BAD_REQUEST);
    }
    const token = await this.jwtService.generateBrokerToken(user);
    return {
      success: true,
      token,
    };
  }
}
