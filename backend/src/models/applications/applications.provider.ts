import { APPLICATION_REPOSITORY } from 'src/common/constants/repositories';
import { Application } from './application.entity';

export const applicationProviders = [
  {
    provide: APPLICATION_REPOSITORY,
    useValue: Application,
  },
];
