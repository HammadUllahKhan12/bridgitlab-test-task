import { applicationProviders } from './applications/applications.provider';
import { brokerProviders } from './brokers/brokers.provider';
import { taskProviders } from './tasks/tasks.provider';

export const modelProviders = [...applicationProviders, ...brokerProviders, ...taskProviders];
