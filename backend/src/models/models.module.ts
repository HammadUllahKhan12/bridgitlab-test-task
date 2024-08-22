import { ApplicationsDataModule } from './applications/applications.module';
import { BrokersDataModule } from './brokers/brokers.module';
import { Module } from '@nestjs/common';
import { TasksDataModule } from './tasks/tasks.module';
import { UploadDataModule } from './uploads/uploads.module';

@Module({
  imports: [ApplicationsDataModule, BrokersDataModule, TasksDataModule, UploadDataModule],
})
export class ModelsModule {}
