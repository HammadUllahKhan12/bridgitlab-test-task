import { BrokerTasksUpdateController } from './update-task.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [BrokerTasksUpdateController],
})
export class BrokerTasksUpdateModule {}
