import { BROKER_REPOSITORY } from 'src/common/constants/repositories';
import { Broker } from 'src/models/brokers/broker.entity';
import { BrokerStatus } from 'src/enums/broker-status.enum';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { JwtService } from 'src/config/jwt/jwt.service';
import { Reflector } from '@nestjs/core';

/**
 * Restricts an API endpoint to broker user accounts
 */
@Injectable()
export class BrokerGuard implements CanActivate {
  constructor(
    @Inject(BROKER_REPOSITORY)
    private readonly brokerEntity: typeof Broker,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    if (authorization?.length && authorization.startsWith('Bearer ') && authorization !== 'Bearer null') {
      const decryptedToken = this.jwtService.verifyToken(authorization.substring('Bearer '.length));
      const broker = await this.brokerEntity.findByPk(decryptedToken.id);
      if (broker?.id && broker.brokerStatus == BrokerStatus.Active) {
        return true;
      }
    }
    return false;
  }
}
