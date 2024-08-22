import { BrokerTasksListModule } from './list-tasks/list-tasks.module';
import { BrokerTasksUpdateModule } from './update-task/update-task.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BrokerTasksListModule, BrokerTasksUpdateModule],
})
export class BrokerTasksModule {}
