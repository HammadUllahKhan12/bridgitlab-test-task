import { BROKER_REPOSITORY } from 'src/common/constants/repositories';
import { Broker } from './broker.entity';

export const brokerProviders = [
  {
    provide: BROKER_REPOSITORY,
    useValue: Broker,
  },
];
