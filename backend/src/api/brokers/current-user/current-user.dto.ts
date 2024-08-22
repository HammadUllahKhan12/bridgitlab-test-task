import { Broker } from 'src/models/brokers/broker.entity';
import { PickType } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/responses';

export class BrokerCurrentUserDto extends PickType(Broker, [
  'createdAt',
  'id',
  'email',
  'mobilePhoneNumber',
  'firstName',
  'lastName',
]) {}

/**
 * The response data
 */
export class BrokerCurrentUserResponseDto extends SuccessResponseDto {
  /**
   * The broker's applications
   */
  readonly broker: BrokerCurrentUserDto;
}
