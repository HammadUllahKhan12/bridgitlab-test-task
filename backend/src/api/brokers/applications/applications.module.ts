import { BrokerApplicationsListModule } from './list-applications/list-applications.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrokerApplicationsListModule],
})
export class BrokerApplicationsModule {}
