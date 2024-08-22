import { BrokerTasksListController } from './list-tasks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [BrokerTasksListController],
})
export class BrokerTasksListModule {}
