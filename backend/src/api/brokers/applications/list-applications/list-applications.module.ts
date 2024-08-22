import { BrokerApplicationsListController } from './list-applications.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [BrokerApplicationsListController],
})
export class BrokerApplicationsListModule {}
