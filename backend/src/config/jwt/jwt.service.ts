import { JwtService as BaseJwtService } from '@nestjs/jwt';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserType } from 'src/enums/user-type.enum';

@Injectable()
export class JwtService {
  constructor(
    @Inject(BaseJwtService)
    private baseJwtService: BaseJwtService,
  ) {}

  generateBrokerToken(broker: BrokerDto, expiresIn?: string): string {
    return this.generateToken(broker, UserType.Broker, expiresIn);
  }

  generateToken(user: BrokerDto, userType: UserType, expiresIn?: string): string {
    return this.baseJwtService.sign(
      {
        userType,
        id: user.id,
        email: user.email,
        mobilePhoneNumber: user.mobilePhoneNumber,
        createdAt: user.createdAt,
      },
      {
        expiresIn: expiresIn || process.env.JWT_EXPIRES_IN || '1d',
        secret: process.env.JWT_SECRET || 'secret',
      },
    );
  }

  verifyToken(token: string) {
    return this.baseJwtService.verify(token, {
      secret: process.env.JWT_SECRET || 'secret',
    });
  }
}
