import { AUTH_ERROR, INVALID_JWT_TOKEN_ERROR } from 'src/common/constants/response-messages';
import { Broker } from 'src/models/brokers/broker.entity';
import { BrokerStatus } from 'src/enums/broker-status.enum';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from 'src/config/jwt/jwt.service';
import { PickType } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/enums/user-type.enum';

class JwtBrokerDto extends PickType(Broker, ['id', 'firstName', 'lastName', 'email', 'brokerStatus']) {
  secretHash: string;
  userType: UserType;
  iat: number;
  exp: number;
}

/**
 * The broker guard makes sure the user is an authenticated
 * broker with a valid JWT token and accredited.  Results
 * are cached briefly because this is applied to almost every
 * broker API endpoint.
 */
@Injectable()
export class BrokerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  /**
   * Checks a request for an authorization header and if it is present and
   * valid then authenticates the broker if they are accredited.
   * @param context {ExecutionContext} The request execution state
   * @returns {boolean}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());
    if (allowUnauthorizedRequest) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.substring('Bearer '.length);
    if (!token?.length) {
      throw new HttpException(AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    let user: JwtBrokerDto;
    try {
      user = await this.jwtService.verifyToken(token);
    } catch (error) {
      throw new HttpException(INVALID_JWT_TOKEN_ERROR, HttpStatus.BAD_REQUEST);
    }
    if (user?.userType !== UserType.Broker) {
      throw new HttpException(AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    const broker = await Broker.findByPk(user.id.toString(), {
      attributes: ['id', 'firstName', 'lastName', 'email', 'mobilePhoneNumber', 'brokerStatus', 'createdAt'],
      raw: true,
    });
    if (!broker?.id) {
      throw new HttpException(AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    if (broker?.brokerStatus !== BrokerStatus.Active) {
      throw new HttpException(AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    request['user'] = broker;
    return true;
  }
}
