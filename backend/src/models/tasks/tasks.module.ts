import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { taskProviders } from './tasks.provider';

@Module({
  imports: [DatabaseModule],
  providers: taskProviders,
  exports: [DatabaseModule],
})
export class TasksDataModule {}
