import { BrokerApplicationsModule } from './brokers/applications/applications.module';
import { BrokerCurrentUserModule } from './brokers/current-user/current-user.module';
import { BrokerSignInModule } from './brokers/sign-in/sign-in.module';
import { BrokerTasksModule } from './brokers/tasks/tasks.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrokerApplicationsModule, BrokerCurrentUserModule, BrokerSignInModule, BrokerTasksModule],
})
export class APIModule {}
